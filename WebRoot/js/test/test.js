// UserAction
function register(){
	var username = "zhousicong@ymatou.com";
	var displayname = "段居鼎";
	var cellphone = "13816700001";
	var remark = "备注信息";
	var telephone = "021-88888888";
	var department = "10";
	var position = "10";
	
	$.ajax({
		type : "post",
		url : 'register.action',
		dataType : "json",
		data : {
			"username" : username,
			"displayname" : displayname,
			"cellphone" : cellphone,
			"remark" : remark,
			"telephone" : telephone,
			"department" : department,
			"position" : position
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#register").html(result);

		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}


function login(){
	var username = "duanjuding@ymatou.com";
	var password = "Uep235Vy";
	
	$.ajax({
		type : "post",
		url : 'login.action',
		dataType : "json",
		data : {
			"username" : username,
			"password" : password
			
		},
		success : function(data) {
			
			var result = JSON.stringify(data);
			$("#login").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

// AuthorizationAction
function getUserAuthorization(){
	var userid = "3";
	
	$.ajax({
		type : "post",
		url : 'findUserByID.action',
		dataType : "json",
		data : {
			"id" : userid
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#getUserAuthorization").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

function updateAuthorization(){
	var userid = "1";
	var newauthorization = "1,2";

	$.ajax({
		type : "post",
		url : 'updateAuthorization.action',
		dataType : "json",
		data : {
			"userid" : userid,
			"newauthorization" : newauthorization
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#updateAuthorization").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

//PermissionAction
function createPermission(){
	var value = "2";
	var description = "2号权限";
	
	$.ajax({
		type : "post",
		url : 'createPermission.action',
		dataType : "json",
		data : {
			"value" : value,
			"description" : description
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#createPermission").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

//PositionAction
function createPosition(){
	var name = "测试";
	
	$.ajax({
		type : "post",
		url : 'createPosition.action',
		dataType : "json",
		data : {
			"name" : name
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#createPosition").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

//DepartmentAction
function createDepartment(){
	var name = "C2C";
	
	$.ajax({
		type : "post",
		url : 'createDepartment.action',
		dataType : "json",
		data : {
			"name" : name
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#createDepartment").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

//EnvironmentAction
function findVminfosByServerInfoId(){
	var serverinfoid = "1";
	
	$.ajax({
		type : "post",
		url : 'findVminfosByServerInfoId.action',
		dataType : "json",
		data : {
			"serverinfoid" : serverinfoid
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#findVminfosByServerInfoId").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}


function findVmInfoById(){
	var vminfoid = "3";
	
	$.ajax({
		type : "post",
		url : 'findVmInfoById.action',
		dataType : "json",
		data : {
			"vminfoid" : vminfoid
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#findVmInfoById").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}


//ApplicationAction
function findApplicationEnvsByVminfoId(){
	var vminfoid = "5";
	
	$.ajax({
		type : "post",
		url : 'findApplicationEnvsByVminfoId.action',
		dataType : "json",
		data : {
			"vminfoid" : vminfoid
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#findApplicationEnvsByVminfoId").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}


function findApplicationEnvById(){
	var appenvid = "3";
	
	$.ajax({
		type : "post",
		url : 'findApplicationEnvById.action',
		dataType : "json",
		data : {
			"appenvid" : appenvid
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#findApplicationEnvById").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}



function listApplications(){
	
	$.ajax({
		type : "post",
		url : 'listApplications.action',
		dataType : "json",
		data : {
			"pagesize" : 10,
			"pageindex" : 1
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#listApplications").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}

function bashcreateapp(){
	
	for(var i = 0;i<1000;i++){
		
		$.ajax({
	        type: "post",
	        url: 'createApplication.action',
	        data: {
	            "applicationtypeid": 1,
	            "domain": "www.ymatou" + i + ".com",
	            "name": "test",
	            "remark": "test",
	            "departmentid": i%4+1
	        },
	        dataType: "json",
	        success: function (data) {

	        },
	        error: function (data) {
	            alert(data.retMSG);
	        }
	    });		
		
	}
	
	
}


function listStressTasks(){
	

		
		$.ajax({
	        type: "post",
	        url: 'listStressTasks.action',
	        data: {
	            "creatorid": 1,
	            "departmentid": 1,
	            "applicationid":1,
	            "pagesize":20,
	            "pageindex":1
	        },
	        dataType: "json",
	        success: function (data) {
				var result = JSON.stringify(data);
				$("#listStressTasks").html(result)
	        },
	        error: function (data) {
	            alert(data.retMSG);
	        }
	    });		
	
}

function listTestApplications(){
	

	
	$.ajax({
        type: "post",
        url: 'listTestApplications.action',
        data: {
            //"departmentid": 1,
            //"applicationid":22,
            "pageSize":20,
            "pageIndex":1
        },
        dataType: "json",
        success: function (data) {
			var result = JSON.stringify(data);
			$("#listTestApplications").html(result)
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });		
}

function getTestpass(){
	
	$.ajax({
        type: "post",
        url: 'getTestpass.action',
        data: {
            "departmentid": 8,
            "applicationid":22,
            "envid":1,
            "pageSize":20,
            "pageIndex":1
        },
        dataType: "json",
        success: function (data) {
			var result = JSON.stringify(data);
			$("#getTestpass").html(result)
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });		
}

function findStressApplications(){
	
	$.ajax({
        type: "post",
        url: 'findStressApplications.action',
        data: {
            "pagesize":20,
            "pageindex":1
        },
        dataType: "json",
        success: function (data) {
			var result = JSON.stringify(data);
			$("#findStressApplications").html(result)
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });		
}

function findStressResultsByApplication(){
	
	$.ajax({
        type: "post",
        url: 'findStressResultsByApplication.action',
        data: {
            "applicationid":22,
        },
        dataType: "json",
        success: function (data) {
			var result = JSON.stringify(data);
			$("#findStressResultsByApplication").html(result)
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });		
}


function queryValidateCode(){
	
	$.ajax({
        type: "post",
        url: 'queryValidateCode.action',
        data: {
            "queryChannelId":1,
            "sloginid":"",
            "phoneno":"",
            "envid":0
        },
        dataType: "json",
        success: function (data) {
			var result = JSON.stringify(data);
			$("#queryValidateCode").html(result)
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });		
}