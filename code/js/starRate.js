/**
*   封装星级评分函数
2020-12-27
 */
$(function () {

    //写一个创建星星偶评分的函数，挂在window上
    window.createStarRate = function (score) {
  // $.fn.createStarRate = function (score) {    //圆形扩展
    //满星
    var on ='<span class="on iconfont icon-xingxing"></span>';
    //半星
    var half='<span class="half iconfont icon-banxing"></span>';
    //灰色星星
    var off ='<span class="off iconfont icon-xingxing"></span>';
    //样式
    /*
    $(on).css({
        fontSize: '50px',
        color: 'gold',

    })
    $(half).css({
        fontSize: '40px',
        color: 'gold',

    })
    $(off).css({
        fontSize: '50px',
        color: '#ccc',        
    })
    */
       //计算分数
       var calcScore =Math.floor(score * 2)/2;
       console.log(calcScore);
       //计算满星
       var onCount =Math.floor(calcScore);
       //计算半星
       var isHasHalf = 0;
       if(calcScore % 1 !==0){
        isHasHalf =1;
       }
       //计算灰色的星星
       var offCount = 5 - onCount - isHasHalf;
       //拼接结果
       var rst ='';
        //拼接满星
       for(var i=0;i<onCount;i++){
           rst += on;
         }
         //拼接半个星星
         if(isHasHalf===1){
             rst += half;
         }
         //拼接灰色星星
         for(var k=0;k<offCount;k++){
             rst+= off;
        
         }
        //返回
        return rst;
      // $(this).html(rst);
    }
})