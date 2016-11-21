const Model from './model';

Model.listdata({
     data: {
         username: 'zmr',
         sex: '女'
     },
     success: function(list){
         console.log(list);
     },
     complete: function(){
         console.log('io complete');
     }
 });
