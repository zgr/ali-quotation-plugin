<template>
    <div :class="prefixCls">
        <el-dialog title="800px" width="1020px" :close-on-click-modal="false" append-to-body :visible.sync="isShowAddDialog" v-if="isShowAddDialog" @close="handlerCancel">
            11111
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: {},
        data() {
            return {
                prefixCls: 'views-about-edit',
                isShowAddDialog: true
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        beforeDestroy() {},
        methods: {
            handlerCancel(){
                this.$emit('on-close')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>