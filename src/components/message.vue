<template>
    <div class="bigBox">
        <div class="title">
            <p class="p">消息(<span>5</span>)</p>
            <i class="font_family icon-close"></i>
        </div>
        <div class="box">
            <div class="top">
            </div>
            <div class="line"></div>
            <div class="bottom">
                <textarea placeholder="在此处输入消息…" rows="3"></textarea>
                <button>发送</button>
            </div>
        </div>
    </div>
</template>
<script></script>
<style lang="less" scoped>
@import "../common/common";
.title {
    padding-bottom: 10px;
    .flex(space-between, center);
    .p {
        .fontStyle(18px, #000, blod);
        padding-left: 10px;
        flex: 1;
    }
    .icon-close {
        color: #c5c6c8;
    }
}
.box {
    border-radius: 6px;
    background-color: #fff;
    flex: 1;
    .flex();
    flex-direction: column;
    .top, .bottom {
        padding: 14px 20px;
    }
    .top {
        flex: 1;
    }
    .line {
        border-bottom: 2px solid #f4f4f4;
    }
    .bottom {
        height: 136px;
        .flex(flex-start, flex-end);
        flex-direction: column;
        textarea {
            border: none;
            resize: none;
            width: 100%;
            outline: none;
            flex: 1;
            margin-bottom: 5px;
        }
        button {
            background-color: #118BFB;
            border-radius: 4px;
            border: none;
            width: 70px;
            height: 30px;
            color: #fff;
        }
    }
}
</style>
