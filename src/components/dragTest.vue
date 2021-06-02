<template>
    <div class="theme-setting">
        <el-dialog
                title="设置选项"
                :visible.sync="dialogVisible"
                width="648px"
                :close-on-click-modal="false"
        >
            <div class="theme-left">
                <dl class="theme-title">
                    <dt class="title">当前选项</dt>
                    <dd class="des">从右侧拖拽添加</dd>
                </dl>
                <draggable class="selected-list" tag="ul"
                           v-model="selectedTheme"
                           v-bind="dragOptions"
                           :move="onMove"
                           @end="onEnd"
                >
                    <li class="selected-theme"
                        v-for="item in selectedTheme"
                        :key="item.type"
                    >{{item.name}}</li>
                </draggable>
            </div>
            <div class="theme-right">
                <h3 class="theme-right-title">全部选项</h3>
                <draggable class="theme-right-list" tag="ul"
                           v-model="unSelectTheme"
                           v-bind="dragOptions"
                           :move="onMove"
                           @end="onEnd">
                    <li class="theme-right-item"
                        v-for="item in unSelectTheme"
                        :key="item.type"
                    >{{item.name}}</li>
                </draggable>
            </div>
            <div class="drag-drop-del" v-show="isShowDel">
                <img src="../../public/image/don1.png" alt="">
            </div>
            <span slot="footer" class="dialog-footer">
  <el-button @click="restoreDefault">恢复默认设置</el-button>
  <el-button type="primary" @click="saveThemeSet">保存</el-button>
 </span>
        </el-dialog>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import draggable from "vuedraggable"
    export default {
        name: 'DragDrop',
        components: {
            draggable
        },
        data() {
            return {
                dialogVisible: false,
                selectedTheme: [{
                    type: 1,
                    name: '选项1'
                }, {
                    type: 2,
                    name: '选项2'
                }, {
                    type: 3,
                    name: '选项3'
                }, {
                    type: 4,
                    name: '选项4'
                }], // 已选主题列表
                unSelectTheme: [{
                    type: 5,
                    name: '选项5'
                }, {
                    type: 6,
                    name: '选项6'
                }], // 未选主题列表
                backSelectedTheme: [], // 选主题列表备份
                backUnSelectTheme: [], // 未选主题列表备份用于恢复默认设置
                relatedListLast: {}, // 已选主题列表最后一项
                isShowDel: false
            }
        },
        methods: {
            showDrag() {
                this.dialogVisible = true
            },
            onMove({ relatedContext, draggedContext, to }) {
                const relatedElement = relatedContext.element
                const draggedElement = draggedContext.element
                let dragInEl = to['className']
                if (dragInEl == 'selected-list') {
                    this.isShowDel = false
                    if (this.selectedTheme.length === 4) {
                        // 判断往已选列表拖时，如果已经满足4项，则记录已选列表的最后一项
                        // 拖拽结束时将此项清除到未选列表中
                        this.relatedListLast = this.selectedTheme[this.selectedTheme.length-1]
                    }
                } else {
                    this.isShowDel = true // 判断如果是往未选列表里拖的话显示垃圾桶
                }
                return (
                    (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
                )
            },
            onEnd(dragObj) {
                let dragInEl = dragObj.to['className']
                if (dragInEl == 'selected-list') {
                    if (this.selectedTheme.length > 4) {
                        // 判断已选列表大于4项，将记录的最后一项过滤出来，并push到未选列表数组
                        this.selectedTheme = this.selectedTheme.filter(item => {
                            return item.type != this.relatedListLast.type
                        })
                        this.unSelectTheme.push(this.relatedListLast)
                    }
                }
                if (dragInEl === 'theme-right-list') {
                    // 判断是往未选列表拖时，拖拽结束时将垃圾桶隐藏
                    this.isShowDel = false
                }
            },
            // 保存设置
            saveThemeSet() {
                const params = {
                    taskTopicList: this.selectedTheme
                }
                if (this.selectedTheme.length !== 4) {
                    Message({
                        type: 'error',
                        message: '需设置4个选项 !'
                    })
                    return false
                }
                $ajax.save(params).then(data => {
                    this.dialogVisible = false
                    Message({
                        type: 'success',
                        message: '保存成功！'
                    })
                    this.$parent.refresh()
                }).catch(err => {
                    console.log(err)
                })
            },
            // 恢复默认设置
            restoreDefault() {
                this.selectedTheme = this.backSelectedTheme
                this.unSelectTheme = this.backUnSelectTheme
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                }
            }
        },
        mounted() {
            console.log(111)
        }
    };
</script>
<!--<style lang="less" scoped>-->
<!--    body, ul, dl, dt, dd, li, h1, h3{-->
<!--        margin: 0;-->
<!--        padding: 0;-->
<!--    }-->
<!--    ul, ol, li {-->
<!--        list-style: none;-->
<!--    }-->
<!--    .theme-setting {-->
<!--        /deep/.el-dialog {-->
<!--            height: 476px;-->
<!--            border-radius: 6px;-->
<!--            .el-dialog__header {-->
<!--                height: 55px;-->
<!--                line-height: 56px;-->
<!--                padding: 0;-->
<!--                border-bottom: 1px solid rgba(13,20,30, 0.1);-->
<!--                .el-dialog__title {-->
<!--                    height:21px;-->
<!--                    font-size:16px;-->
<!--                    font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;-->
<!--                    font-weight:bold;-->
<!--                    color:rgba(13,20,30,1);-->
<!--                    line-height:21px;-->
<!--                }-->
<!--                .el-dialog__headerbtn {-->
<!--                    margin-top: -4px;-->
<!--                }-->
<!--            }-->
<!--            .el-dialog__body {-->
<!--                position: relative;-->
<!--                display: flex;-->
<!--                height: 331px;-->
<!--                padding: 0;-->
<!--                border-bottom: 1px solid rgba(13,20,30, 0.1);-->
<!--                .theme-left {-->
<!--                    width: 218px;-->
<!--                    margin-left: 24px;-->
<!--                    border-right: 1px solid rgba(13,20,30, 0.1);-->
<!--                    .theme-title {-->
<!--                        display: flex;-->
<!--                        margin-top: 24px;-->
<!--                        .title {-->
<!--                            height:19px;-->
<!--                            margin-right: 4px;-->
<!--                            font-size:14px;-->
<!--                            font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;-->
<!--                            font-weight:bold;-->
<!--                            color:rgba(13,20,30,1);-->
<!--                            line-height:19px;-->
<!--                        }-->
<!--                        .des {-->
<!--                            height:16px;-->
<!--                            font-size:12px;-->
<!--                            font-family:MicrosoftYaHei;-->
<!--                            color:rgba(13,20,30,0.6);-->
<!--                            line-height:19px;-->
<!--                        }-->
<!--                    }-->
<!--                    .selected-list {-->
<!--                        height: 240px;-->
<!--                        margin-top: 24px;-->
<!--                        overflow: hidden;-->
<!--                        .selected-theme {-->
<!--                            width:160px;-->
<!--                            height:48px;-->
<!--                            line-height:48px;-->
<!--                            text-align: center;-->
<!--                            margin-bottom: 16px;-->
<!--                            cursor: pointer;-->
<!--                            background:linear-gradient(180deg,rgba(43,46,83,1) 0%,rgba(108,116,150,1) 100%);-->
<!--                            border-radius:6px;-->
<!--                            font-size:14px;-->
<!--                            font-family:MicrosoftYaHei;-->
<!--                            color:rgba(255,255,255,1);-->
<!--                        }-->
<!--                    }-->
<!--                }-->
<!--                .theme-right {-->
<!--                    padding: 0 24px;-->
<!--                    .theme-right-title {-->
<!--                        padding-top: 24px;-->
<!--                        height:19px;-->
<!--                        font-size:14px;-->
<!--                        font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;-->
<!--                        font-weight:bold;-->
<!--                        color:rgba(13,20,30,0.4);-->
<!--                        line-height:19px;-->
<!--                    }-->
<!--                    .theme-right-list {-->
<!--                        width: 357px;-->
<!--                        height: 240px;-->
<!--                        overflow: scroll;-->
<!--                        margin-top: 24px;-->
<!--                        .theme-right-item {-->
<!--                            width: 160px;-->
<!--                            height:48px;-->
<!--                            line-height:48px;-->
<!--                            float: left;-->
<!--                            margin-right: 16px;-->
<!--                            margin-bottom: 16px;-->
<!--                            background:rgba(247,248,252,1);-->
<!--                            border-radius:6px;-->
<!--                            font-size:14px;-->
<!--                            font-family:MicrosoftYaHei;-->
<!--                            color:rgba(13,20,30,0.4);-->
<!--                            text-align: center;-->
<!--                            cursor: pointer;-->
<!--                        }-->
<!--                    }-->
<!--                    .theme-right-list::before, .theme-right-list::after {-->
<!--                        content: "";-->
<!--                        display: table;-->
<!--                    }-->
<!--                    .theme-right-list::after {-->
<!--                        clear: both;-->
<!--                    }-->
<!--                }-->
<!--                .drag-drop-del {-->
<!--                    position: absolute;-->
<!--                    right: 1px;-->
<!--                    top: 0;-->
<!--                    width: 404px;-->
<!--                    height: 331px;-->
<!--                    display: flex;-->
<!--                    justify-content: center;-->
<!--                    align-items: center;-->
<!--                    background-image: url('../../src/assets/imgs/drapDrop/drag_drop.png');-->
<!--                    img {-->
<!--                        width: 96px;-->
<!--                        height: 96px;-->
<!--                    }-->
<!--                }-->
<!--            }-->
<!--            .el-dialog__footer {-->
<!--                height: 88px;-->
<!--                padding: 24px 24px 0;-->
<!--                .dialog-footer {-->
<!--                    .el-button+.el-button {-->
<!--                        margin-left: 16px;-->
<!--                    }-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->
