/**
 * 购物车功能js
*/
$(function () {
    //把三个类型的input分别先获取
    var $theadInput = $('thead input[type=checkbox]'); //表头中的全选框
    var $tbodyInputs = $('tbody input[type=checkbox]'); //表头中的每一行的选择框
    var $totalPriceInput = $('.totalPrice input[type=checkbox]'); //计算总价中的全选框

    /*全选*/
    /*
         1.给表头中的全选按钮 绑定点击事件
         2.给表格中的每一行的数据的input选择框
         3.给计算总价中的全选框
    */
   //表头的全选
   $theadInput.change(function () {
      var checkState = $(this).prop('checked');//获取全选框的选中状态
      $tbodyInputs.prop('checked',checkState);//把状态给表格中的选择框
      $totalPriceInput.prop('checked',checkState);//把状态给计算总价中的全选框

      allTotal();//总计
   });
   /*
      计算总价的全选
      1.给计算总价的全选按钮
      2.把状态给表头
      3.把状态给表格中的选择框
   */
   $totalPriceInput.change(function () {
       var checkState = $(this).prop('checked');//获取计算总价中的全选状态

       $theadInput.prop('checked',checkState);//赋值给表头全选框
       $tbodyInputs.prop('checked',checkState);//赋值给表格中全选框

       allTotal();//总计
   })

   /*
      表格中的选择框 反过来影响两个全选框
      1.给表格中的选择框绑定点击事件
      2.定一个标杆 flag = true；
      3.循环表格中的选择框
      4.获取每一个选择框的选中状态
          判断：如果有一个是false 那么久不选
      5.把flag的值赋值给两个全选框
   */
   $tbodyInputs.change(function () {//给表格总单选框绑事件
       var flag = true;//定标杆
       $tbodyInputs.each(function (index,input) {//循环表格
           var checkState = $(this).prop('checked');//获取选中状态
           if (checkState === false) {//如果有一个等于false
               flag = false;//标杆变为false
           }
       })
       $theadInput.prop('checked',flag);//把状态赋值给头部全选框
       $totalPriceInput.prop('checked',flag);//把状态赋值给计算价格全选框

       allTotal();//总计
   })
   /*
     加法功能：
          1.获取+按钮，绑定事件
          2.点击的时候，获取后面输入框的值
          3.输入框的值自增
          4.把自增后的值，重新赋值给后面的输入框
   */
   $('.add').click(function () {
       var count = parseInt($(this).next().val());
       count++;
       $(this).next().val(count);

       //小计
       subTotal($(this),count);

       allTotal();//总计
   })
   /*
      减法功能：
      1.给-绑定点击事件
      2.获取前面输入框的值
      3.值自增，边界判断，
      4.把减少后的值 重新赋值给前面的输入框
   */
   $('.reduce').click(function () {
       var count = parseInt($(this).prev().val());

       count--;
       count = count < 1 ? 1 : count;
       $(this).prev().val(count);

        //小计
        subTotal($(this),count);

        allTotal();//总计
   })

   /*
      封装一个小计函数：（点击）
   */
  function subTotal(dom, count) {
      var singlePrice = parseFloat(dom.closest('tr').find('.price').text());//找到单价

      var subTotalPrice = singlePrice * count;//单价*数量=小计
      dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2))
  }
  /*
     总计功能实现：（头部全选 计算总价全选 表格的选择框）
         1.定义一个变量 用于保存价格
         2.获取所有表格中的选择框
         3.如果选中，那么就要累加这一行的小计  
  */
   function allTotal() {
       var allPrice = 0;//定义一个变量 用于保存总价
       var selectedCount = 0;//定义一个变量 用户保存已选商品
        
       $('tbody input[type=checkbox]').each(function () { //获取表格中的选择框 循环
           var checkState = $(this).prop('checked');//获取选中状态
           if (checkState) {//如果是true
               allPrice += parseFloat($(this).closest('tr').find('.subprice').text());
               selectedCount++;
           }
       })
        //渲染
        $('.total').text(allPrice.toFixed(2));
        $('.count').text(selectedCount);
   }

   /*
       关于下面的删除功能： 模拟   
    */
   //删除
   $('.del').click(function () {
    $(this).closest('tr').remove() //干掉自己
    getGoodsCount();//重新计算商品数量
    allTotal();
})

//删除选中
$('.deleteChecked').click(function () {
   $('tbody input[type=checkbox]').each(function () { //获取表格中的选择框 循环
       var checkState = $(this).prop('checked');//获取选中状态
       if (checkState) {//如果是true
           $(this).closest('tr').remove();//干掉自己   
       }
    })
    getGoodsCount();
    allTotal();
 })

//封装一个获取全部商品的函数
function getGoodsCount() {
    //获取数量
    var goodsCount = $('table tbody tr').length;
    //渲染
    $('.goodsCount').text(goodsCount);
}
 getGoodsCount();//页面加载调用一次

     
})
