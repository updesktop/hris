function fm_employee(cb){  
  FM_TRANS='EMP';
  FM_FM_MODE=1;
  FM_TABLE=DB_EMPLOYEE;  FM_TABLE_NAME='employee';  FM_RKEY='empno';
  FM_CB=cb;

  FM_FIELDS=[ //display on screen
    { div:"tx_empno", fld:"empno", type:"text", disp:1, save:true },
    { div:"tx_empname", fld:"empname", type:"text", disp:0, save:true },
    { div:"tx_lname", fld:"lname", type:"text", disp:1, save:true },
    { div:"tx_fname", fld:"fname", type:"text", disp:1, save:true },
    { div:"tx_mname", fld:"mname", type:"text", disp:1, save:true },
    { div:"tx_bday", fld:"bday", type:"date", disp:1, save:true },
    { div:"tx_gender", fld:"gender", type:"number", disp:1, save:true },    
    { div:"tx_addrss", fld:"addrss", type:"text", disp:1, save:true },
    { div:"tx_phone", fld:"phone", type:"text", disp:1, save:true },
    { div:"tx_email", fld:"email", type:"text", disp:1, save:true },

    { div:"tx_status", fld:"status", type:"number", disp:1, save:true },
    { div:"tx_deptno", fld:"deptno", type:"number", disp:1, save:true },
    { div:"tx_position", fld:"position", type:"text", disp:1, save:true },
    { div:"tx_emptype", fld:"emptype", type:"number", disp:1, save:true } 
  ];
    
  var fm_ob = {
    title:"EMPLOYEE MASTER FILE",  
    title2:"EMPLOYEE",
    width:"800px",height:"270px",
    head:"100px", foot:"30px",
    foot_dtl:""
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  let h_box1=275;
  let h_box2=H_BODY-(h_box1+100);
  let ary_stat=[
    { "stat":0,"lbl":"","clor":"blue" },
    { "stat":1,"lbl":"Active","clor":"blue" },
    { "stat":2,"lbl":"None","clor":"red" }
  ];  

  let ary_emptype=[
    { "stat":0,"lbl":"","clor":"blue" },
    { "stat":1,"lbl":"Regular","clor":"blue" },
    { "stat":2,"lbl":"C.O.S.","clor":"orange" },
    { "stat":3,"lbl":"J.O.","clor":"black" }
  ]; 

  var fm_layout=

    '<div id="div_FM_head" data-mode=0 style="width:100%;height:460px;font-family: "Lato", sans-serif;font-size:10px;text-align:left;padding:0px;border:1px solid red;background:blue;">'+
      
       '<input id="tx_empname" type="text" data-caption="Employee Name" style="display:none;" value="" />'+

      '<div style="width:100%;height:'+h_box1+'px;margin-top:0px;background:none;">'+ 

        '<div style="float:left;width:60%;height:100%;padding:5px;border:1px solid lightgray;">'+   
          
          '<div class="cls_emp_entry" style="position:relative;">'+
            '<div style="">Emp. Code</div>'+
            '<input id="tx_empno" type="text" style="text-transform:uppercase;" onchange="chk_empno()" maxlength=9 data-caption="Emp Code" value="" />'+  
            '<input id="lu_empno" class="xxcls_lookup" type="image" style="position:absolute;top:0px;right:0px;width:auto;height:100%;background:lightgray;" src="gfx/jsearch.png" onclick="lookup_fm_emp()" />'+        
          '</div>'+

          '<div class="cls_emp_entry" style="margin-top:15px;">'+
            '<div style="">Last Name</div>'+
            '<input id="tx_lname" type="text" style="" data-caption="Last Name" value="" />'+         
          '</div>'+
          '<div class="cls_emp_entry" style="">'+
            '<div style="">First Name</div>'+
            '<input id="tx_fname" type="text" style="" data-caption="First Name" value="" />'+         
          '</div>'+
          '<div class="cls_emp_entry" style="">'+
            '<div style="">Mid-Name</div>'+
            '<input id="tx_mname" type="text" style="" data-caption="Middle Name" value="" />'+         
          '</div>'+
          
          '<div class="cls_emp_entry" style="">'+
            '<div style="">Gender</div>'+
            '<select id="tx_gender" name="tx_gender" style="" data-caption="Gender">';        
              let gndr='';     
              let ary=["","Male","Female"];       
              for(var i=1;i < ary.length;i++){
                let vsel='';
                gndr+='<option '+vsel+' value="'+i+'">'+ary[i]+'</option>';
              }
              fm_layout+=gndr+
            '</select>'+      
          '</div>'+
          '<div class="cls_emp_entry" style="">'+
            '<div style="">Birthday</div>'+
            '<input id="tx_bday" type="date" style="" data-caption="Birthday" value="" />'+         
          '</div>'+

          '<div class="cls_emp_entry" style="height:50px;">'+
            '<div style="">Address</div>'+
            '<textarea id="tx_addrss"  style="float:left;resize:none;height:50px;" name="tx_addrss" rows="3" cols="50" maxlength=300">'+
            '</textarea>'+   
          '</div>'+

          '<div class="cls_emp_entry" style="">'+
            '<div style="">Contact No.</div>'+
            '<input id="tx_phone" type="text" style="" data-caption="Middle Name" value="" />'+         
          '</div>'+
          '<div class="cls_emp_entry" style="">'+
            '<div style="">Email</div>'+
            '<input id="tx_email" type="text" style="" data-caption="Middle Name" value="" />'+         
          '</div>'+

        '</div>'+
          
        '<div style="float:right;width:38%;height:100%;text-align:center;padding:5px;border:1px solid lightgray;">'+    

          '<input type="file" id="inpfile_emp" data-orig="" data-sel=0 name="inpfile_emp" value="" hidden="hidden" />'+
          '<input id="tx_emp_photo" type="text" data-caption="Photo" style="display:none;" value="" />'+ 

          '<div style="position:relative;height:190px;width:100%;text-align:center;padding:3px;border:1px solid lightgray;">'+    
            '<img id="img_emp" data-img="" name="img_emp" src="gfx/avatar.png" onclick="JBE_ZOOM(this.src,&quot;&quot;)" style="border:1px solid lightgray;"/>'+               
            '<img id="lu_img_emp" class="cls_lookup" src="gfx/jcam2.png" onclick="JBE_GET_IMAGE(0,inpfile_emp.id,img_emp.id,&quot;&quot;,false)" style="position:absolute;bottom:0px;right:2px;width:auto;height:30px;cursor:pointer;background:none;"/>'+
          '</div>'+

          '<div style="height:80px;width:100%;margin-top:5px;text-align:center;background:none;">'+ 
            '<div id="lb_empname" style="height:15px;width:100%;text-align:center;overflow:auto;color:blue;"></div>'+
            '<div style="height:auto;width:100%;text-align:center;font-size:8px;">Full Name</div>'+ 

            '<div id="lb_bday" style="height:15px;width:100%;text-align:center;margin-top:5px;color:darkblue;"></div>'+ 
            '<div style="height:auto;width:100%;text-align:center;font-size:8px;">Birthday</div>'+             
          '</div>'+

        '</div>'+
      '</div>'+

      //// details 2
      '<div style="width:100%;height:'+h_box2+'px;margin-top:10px;overflow:auto;background:none;">'+ 

        '<div style="position:relative;float:left;width:49.5%;height:100%;padding:5px;border:1px solid lightgray;">'+  

          '<div class="cls_emp_entry" style="">'+
            '<div style="">Emp. Status</div>'+
            '<select id="tx_status" name="tx_status" style="" data-caption="Status">';        
              let emp_stat='';                        
              for(let ii=1;ii < ary_stat.length;ii++){
                let vstat='';
                emp_stat+='<option '+vstat+' value="'+ii+'"  style="color:'+ary_stat[ii].clor+'">'+ary_stat[ii].lbl+'</option>';
              }
              fm_layout+=emp_stat+
            '</select>'+             
          '</div>'+

          '<div class="cls_emp_entry" style="position:relative;">'+
            '<div style="">Department</div>'+
            '<input id="tx_deptno" type="text" style="display:none;" data-caption="Department" value="" />'+
            '<input id="tx_deptname" type="text" style="pointer-events:none;" data-caption="Department" value="" />'+
            '<input id="lu_deptno" class="cls_lookup" type="image" style="position:absolute;top:0px;right:0px;width:auto;height:100%;background:lightgray;" src="gfx/jsearch.png" onclick="lookup_deptno()" />'+        
          '</div>'+ 

          '<div class="cls_emp_entry" style="">'+
            '<div style="">Position</div>'+
            '<input id="tx_position" type="text" style="" data-caption="Position" value="" />'+         
          '</div>'+ 

          '<div class="cls_emp_entry" style="">'+
            '<div style="">Emp. Type</div>'+
            '<select id="tx_emptype" name="tx_emptype" style="" data-caption="Employee Type">';        
              let stat='';                        
              for(let ii=1;ii < ary_emptype.length;ii++){
                let vstat='';
                stat+='<option '+vstat+' value="'+ii+'"  style="color:'+ary_emptype[ii].clor+'">'+ary_emptype[ii].lbl+'</option>';
              }
              fm_layout+=stat+
            '</select>'+             
          '</div>'+          

        '</div>'+

        '<div style="position:relative;float:right;width:49.5%;height:100%;padding:5px;border:1px solid lightgray;">'+   
          '<div class="cls_emp_entry" style="">'+
            '<div style="">First Name</div>'+
            '<input id="tx_fname" type="text" style="" data-caption="First Name" value="" />'+         
          '</div>'+
          '<div class="cls_emp_entry" style="">'+
            '<div style="">Mid Name</div>'+
            '<input id="tx_mname" type="text" style="" data-caption="Middle Name" value="" />'+         
          '</div>'+
        '</div>'+

      '</div>'+
      
    '</div>';

  FM_FUNC={
    look:"look_fm_emp",
    init:"init_fm_emp",
    add:"add_fm_emp",
    edit:"edit_fm_emp",
    del:"del_fm_emp",
    disp:"disp_fm_emp",
    save:"save_fm_emp"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function lookup_fm_emp(){
  var flds=[
    { title:"Code", fld:"empno", type:"text", width:"40%", align:"left" },
    { title:"Name", fld:"empname", type:"text", width:"60%", align:"left" },
    { title:"", fld:"bday", type:"text", width:"0%", align:"left" },
    { title:"", fld:"deptno", type:"text", width:"0%", align:"left" }
  ];
  var ob=[
    { val:tx_empno.value, fld:"empno" },
    { val:tx_empname.value, fld:"empname" }
  ];
  FM_LOOKUP2(true,tx_empno.value,ob,FM_TABLE,['empno'],'LOOKUP','do_lu_fm_emp',flds);
}
function do_lu_fm_emp(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_empno'+ndx).innerHTML;  
  let empname=document.getElementById('dd_empname'+ndx).innerHTML;
  let bday=document.getElementById('dd_bday'+ndx).innerHTML;
  let deptno=document.getElementById('dd_deptno'+ndx).innerHTML;
  let deptname=JBE_GETFLD('name',DB_DEPT,'deptno',deptno);
  
  //let fname=document.getElementById('dd_fname'+ndx).innerHTML;
  document.getElementById('tx_empno').value=val; 
  document.getElementById('lb_empname').innerHTML=empname;  
  document.getElementById('lb_bday').innerHTML=JBE_DATE_FORMAT(bday,'MMM DD, YYYY'); 

  document.getElementById('tx_deptno').value=deptno;
  document.getElementById('tx_deptname').value=deptname;
  //alert('deptno : '+deptname);
  //document.getElementById('tx_fname').value=fname;  
  let n = new Date().toLocaleTimeString('it-IT');
  let img='upload/'+val+'.jpg?'+n;
  document.getElementById('img_emp').src=img; 
  FM_DISP_REC(val);
}

function lookup_deptno(){
  var flds=[
    { title:"Code", fld:"deptno", type:"text", width:"40%", align:"left" },
    { title:"Name", fld:"name", type:"text", width:"60%", align:"left" }
  ];
  var ob=[
    { val:tx_deptno.value, fld:"deptno" },
    { val:tx_deptname.value, fld:"name" }
  ];
  FM_LOOKUP2(true,tx_deptname.value,ob,DB_DEPT,['name'],'LOOKUP','do_lu_deptno',flds);
}
function do_lu_deptno(ndx){	  
  if(ndx == -1){ 
    return; 
  }
  let val=document.getElementById('dd_deptno'+ndx).innerHTML;  
  let deptname=document.getElementById('dd_name'+ndx).innerHTML;
  alert(deptname);
  //let fname=document.getElementById('dd_fname'+ndx).innerHTML;
  document.getElementById('tx_deptno').value=val; 
  document.getElementById('tx_deptname').value=deptname;  
}

function chk_empno(){
  document.getElementById('tx_empno').value=document.getElementById('tx_empno').value.toUpperCase().trim();
  let refno=JBE_REC_EXIST(DB_EMPLOYEE,FM_RKEY,document.getElementById('tx_empno').value,'empno');
  //refno=refno.toUpperCase();
  //alert(FM_ADD_FLAG+' refno:'+refno);
  if(refno){
    FM_DISP_REC(refno); 
    return;
  }
  let prfx=document.getElementById('tx_empno').value.slice(0,4);
  if(prfx != 'CHO-'){
    MSG_SHOW(vbOk,"ERROR: ","<center>Invalid Employee Code: "+prfx+"<br>Try Again.</center>",function(){},function(){}); 
    return false; 
  }
  //alert(document.getElementById('tx_empno').value);
  document.getElementById('tx_lname').focus();
}

function chg_prodType_emp(type){
  return;
  if(type==3){ //equiptment
    document.getElementById('dv_lotno').innerHTML='Model/Serial No.:';
    document.getElementById('dv_expiry').style.pointerEvents='none';
    document.getElementById('dv_expiry').style.opacity='0.5';
    document.getElementById('tx_lotno').readOnly = false;
  }else{
    document.getElementById('dv_lotno').innerHTML='Lot No.:';
    document.getElementById('dv_expiry').style.pointerEvents='auto';
    document.getElementById('dv_expiry').style.opacity='1';
    document.getElementById('tx_lotno').readOnly = true;
  }
}

function putImg_emp(){
  var vimg=document.getElementById('img_emp').getAttribute('data-img');  
  document.getElementById('tx_emp_photo').value=vimg;
  //alert('vimg:'+vimg);

  let img=document.getElementById('img_emp').src;
  document.getElementById('tx_b64').value=img;
  //alert('img:'+img);

}
//

//
function init_fm_emp(){    
  document.getElementById('div_FM_head').setAttribute('data-mode',0); //add mode
  document.getElementById('tx_empno').value='';
  document.getElementById('tx_empname').value='';
  //document.getElementById('lu_img_emp').style.pointerEvents='none';
  //document.getElementById('lu_img_emp').style.opacity='0.5';
  document.getElementById('lu_empno').disabled=false;
  document.getElementById('lu_empno').style.opacity='1';
  document.getElementById('lb_empname').innerHTML=''; document.getElementById('lb_bday').innerHTML=''; 
  document.getElementById('tx_fname').value='';
  document.getElementById('tx_lname').value='';
  document.getElementById('tx_mname').value='';

  document.getElementById('tx_deptname').value='';
  
    /*
  document.getElementById('lu_emp_photo').style.pointerEvents='none';
  document.getElementById('lu_emp_photo').style.opacity='0.5';
  document.getElementById('lu_emp_capture').style.pointerEvents='none';
  document.getElementById('lu_emp_capture').style.opacity='0.5';
  */
  document.getElementById('img_emp').src='gfx/avatar.png';
  enabled_lookup(false);
}
//
function new_fm_emp(){  
  if(!JBE_CHK_USER(1)){ return; }  
  document.getElementById('div_FM_head').setAttribute('data-mode',1); //add mode
  let prfx='CHO-';
  let lastno = parseInt(DB_EMPLOYEE.at(-1).empno.slice(4));
  lastno++;
  let newEmployee=prfx+lastno;
  return newEmployee;
}
//
function add_fm_emp(){
  //alert('going to add'); return false;
  document.getElementById('img_emp').src='gfx/avatar.png';
  document.getElementById('lu_empno').disabled=true;
  document.getElementById('lu_empno').style.opacity='0.5';
  document.getElementById('tx_empno').value=new_fm_emp();
  enabled_lookup(false);
  document.getElementById('tx_lname').focus();
}
//edit
function edit_fm_emp(){
  document.getElementById('lu_empno').disabled=true;
  document.getElementById('lu_empno').style.opacity='0.5';
  //document.getElementById('lu_img_emp').style.pointerEvents='auto';
  //document.getElementById('lu_img_emp').style.opacity='1';
  enabled_lookup(true);
  document.getElementById('tx_lname').focus();
}
//look
function look_fm_emp(fld){
  //if(fld=='stockno'){ 
    disp_fm_emp();
  //}  
}
//del
function del_fm_emp(stat,r){
  if(stat==1){ 
    //let refno=JBE_REC_EXIST(DB_RECEIVE2,FM_RKEY,document.getElementById('tx_empno').value,'trano');
    let refno=JBE_GETFLD('trano',DB_RECEIVE2,'stockno',document.getElementById('tx_empno').value);
    //alert(refno);
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in Receiving File No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_EMPLOYEE=r; } 
}

//save
function save_fm_emp(stat,r){
  //alert('stat :'+stat+' r:'+r);
  let fullname=document.getElementById('tx_fname').value+' '+document.getElementById('tx_mname').value.slice(0,1)+'. '+document.getElementById('tx_lname').value;
  document.getElementById('tx_empname').value=fullname;
  document.getElementById('lb_empname').innerHTML=fullname;
  //alert('fullname: '+fullname);
  var recno=document.getElementById('tx_empno').value;     
  if(stat==1){
    if(!recno){
      MSG_SHOW(vbOk,"ERROR: ","Can't Save, Employee Code field is Empty.",function(){},function(){}); 
      return false; 
    }
  }

  if(stat==2){
    DB_EMPLOYEE=r; 
    var targetDIR='upload/';
    var newName = tx_empno.value.trim() + '.jpg';    
    if(THISFILE[0]){     
      //alert('going to save image...');
      let ob = [
        { "div":"img_emp" }
      ];
      uploadNOW_php(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
  }
}


  


//disp
function disp_fm_emp(){   
  //alert('disp_fm_emp ');
  let n = new Date().toLocaleTimeString('it-IT');  
  let img='upload/'+tx_empno.value.trim()+'.jpg?'+n;
  document.getElementById('img_emp').src=img;
  // USAGE
  /*
  checkIfImageExists(img, (exists) => {
    if(exists) {
      console.log('Image exists.');
      document.getElementById('img_emp').src=img;
      //img_emp.src=img;
    }else{
      alert('wala');
      //document.getElementById('img_emp').src="gfx/avatar.png";
      //img_emp.src="gfx/avatar.png";
    }
  });
  */
  
  //img_emp.src=img;
  //img_emp.onerror=img_emp.onerror=null;img_emp.src="gfx/jsite.png"; 
  //if(img_emp.onerror=img_emp.onerror=null){ img_emp.src="gfx/jsite.png"; }
  //if(!img_emp.src){ alert('wala'); }
  //alert(img);
  
  document.getElementById('lu_empno').disabled=false;
  document.getElementById('lu_empno').style.opacity='1';  
  
  document.getElementById('lu_img_emp').style.pointerEvents='none';
  document.getElementById('lu_img_emp').style.opacity='0.5';


  //document.getElementById('tx_fname').value=JBE_GETFLD('prodname',DB_PRODUCT,'prodno',document.getElementById('tx_prod_no').value);
  //recno=document.getElementById('tx_empno').value;
  
  //chg_prodType_emp(tx_prod_type);  
}

function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    
    img.onerror = () => {
      callback(false);
    };
  }
}


