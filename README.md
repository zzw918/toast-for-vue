这是配合vue框架使用的toast，方便引入。

install:

>npm install toast-for-vue --save

>import Toast from 'toast-for-vue'

>import 'toast-for-vue/lib/toast.css'

> Vue.use(Toast)

or:

 Vue.use(Toast, {

  defaultType: "top",
  
  defaultDuration: 15000
  
})

usage:
> this.$toast("success!");

> this.$toast.top("error！");

> this.$toast.bottom("no!");
