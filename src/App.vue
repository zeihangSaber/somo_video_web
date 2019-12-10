<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
    </div>
    <router-view/>
  </div>
</template>

<style>
	html,
	body,
	div,
	span,
	iframe,
	input,
	select,
	map,
	font,
	img,
	a img,
	samp,
	strong,
	hr,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	b,
	p,
	blockquote,
	a,
	address,
	code,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	form,
	label,
	table,
	tr,
	td,
	th {
		padding: 0;
		margin: 0;
		border: 0;
		box-sizing: border-box;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
			sans-serif;
	}
	@keyframes hide{
		0%{
			width: 20%;
		}
		100%{
			width: 0%;
		}
	}
	@keyframes show{
		0%{
			width: 0%;
		}
		100%{
			width: 20%;
		}
	}
	@keyframes foot_hide{
		0%{
			height: 80px;
		}
		100%{
			height: 0.5px;
		}
	}
	@keyframes foot_show{
		0%{
			height: 0.5px;
		}
		100%{
			height: 80px;
		}
	}
	input,textarea{
		outline:none;
		resize:none;
	}
</style>
