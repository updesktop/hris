//======================================
function xJBE_LOOKUP(mode,func,tilt,db,code,desc,db2,code2,desc2) {  
  document.getElementById('lookup-title').innerHTML=tilt;
  if(!mode)	{
    document.getElementById('lookup').style.display='none';    
    return;
  }    

  //showProgress(true);
  document.getElementById('lookup').style.display='block';  
  document.getElementById('lookup').setAttribute('data-targdiv',code);
    createTable(db,code,desc,db2,code2,desc2,func);
  //showProgress(false);  
  document.getElementById('lookup-inp').value='';
  document.getElementById('lookup-inp').focus();
}

//======================================
function JBE_LOOKUP(mode,div_Search,DB,tilt,func,code,flds) {  
  if(!mode){
    //document.getElementById('lookup').style.display='none';    
    JBE_CLOSEBOX();
    return;
  }    
  
  var box2=0; 
  var box1=H_VIEW-(30+box2);
  
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:'+box1+'px;font-text:14px;padding:0px;background-color:white;">'+         
      '<div style="width:100%;height:40px;padding:2px;text-align:center;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
         '<input id="filterInput" type="text" style="float:left;width:100%;height:100%;text-align:center;" value="" placeholder="Search here..."/>'+      
      '</div>'+    
      '<div style="width:100%;height:'+(box1-50)+'px;padding:5px;border:0px solid red;overflow:auto;">';
        var ddd='';
        for(var i=0;i<DB.length;i++){   
          ddd+=
          '<div id="d_'+i+'" class="cls_names" onclick="'+func+'(&quot;'+flds[0]+'&quot;,&quot;'+DB[i][code]+'&quot;);JBE_CLOSEBOX();" style="font-size:12px;width:100%;height:30px;padding:5px;border:1px solid gray;">';

            //'<div style="float:left;width:50%;background:none;">'+FM_TABLE[i][flds[0]]+'</div>'+
            //'<div style="float:left;width:50%;background:none;">'+FM_TABLE[i][flds[1]]+'</div>'+
            

            let z_width=100/flds.length;
            let z_dtl='';
            for(var z=0;z<flds.length;z++){
              if(z==1){
                z_dtl+='<div id="dd_'+i+'" style="float:left;width:'+z_width+'%;background:none;">'+DB[i][flds[z]]+'</div>';
              }else{
                z_dtl+='<div style="float:left;width:'+z_width+'%;background:none;">'+DB[i][flds[z]]+'</div>';
              }
            }
                          
            ddd+=z_dtl+
          '</div>';          
        }
        dtl+=ddd+
      '</div>'+    
    '</div>';
     
  
  var dtl2=
    '<div style="width:100%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
      tilt+
    '</div>';

  JBE_OPENBOX('div_name',tilt,dtl,dtl2); 
  //alert('div_Search '+div_Search);
  JBE_SEARCH_BOX('filterInput','cls_names',div_Search);
}

function createTable(db,code,desc,db2,code2,desc2,func){
  var dtl='';  
  var bg='white';
  for(i=0;i<db.length;i++){
    var vcode=db[i][code];
    var dtlDesc=db[i][desc];
    if(db2){
      var vcode2=db[i][code2];        
      var vdesc2=JBE_GETFLD(desc2,db2,code2,vcode2);
      dtlDesc=db[i][desc]+', '+vdesc2;
    }
    
    dtl+=
    '<tr onclick="getLU_code(&quot;'+vcode+'&quot;,'+func+',&quot;'+code+'&quot;)" class="cls_tbl">'+
      '<td style="width:70%;border:0px;padding:0px;">'+dtlDesc+'</td>'+
      '<td style="width:30%;border:0px;padding:0px;text-align:right;">'+db[i][code]+'</td>'+
    '</tr>';
    if(bg=='white'){ bg='lightgray'; }
    else{ bg='white'; }
  }

  var dtl0=
  '<tr class="header">'+
    '<th style="width:60%;">Name</th>'+
    '<th style="width:40%;">Country</th>'+
  '</tr>';
  dtl0=dtl;
  document.getElementById("lookup-table").innerHTML=dtl0;
}	
//======================================
function getLU_code(v,func,code){  
  document.getElementById('lookup').setAttribute('data-recno',v);
  //document.getElementById(targdiv).value=v;
  document.getElementById('lookup').style.display='none';  
  if(func){ func(code,v); }
}


function JBE_LOOKUP_FUNC() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("lookup-inp");
  filter = input.value.toUpperCase();
  table = document.getElementById("lookup-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

