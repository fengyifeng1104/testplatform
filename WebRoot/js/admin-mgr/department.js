/**
 * Created by zhousicong on 2015/10/19.
 */
var departmentvm = avalon.define({
    $id: 'departmentvm',
    editStatus: false,
    depList: [],
    initRole: function () {
        var cookieToken = model.getCookie("token");
        if (cookieToken.length < 3) {
            window.location.href = '/html/admin/admin.html';
        }
    },
    listDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.deps;
                for (var i = 0; i < data.deps.length; i++) {
                    temArr[i].modifyClass = "showIcon";
                    temArr[i].saveClass = "hideIcon";
                    temArr[i].readonly = true;
                }
                departmentvm.depList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    initModify: function (index) {
        if (departmentvm.editStatus) {
            alert("你还有尚未完成编辑的项目！")
            return;
        }
        departmentvm.editStatus = true;
        departmentvm.depList[index].readonly = false;
        departmentvm.depList[index].modifyClass = "hideIcon";
        departmentvm.depList[index].saveClass = "showIcon";
    },
    cancleModifyDep: function (index) {
        departmentvm.editStatus = false;
        departmentvm.depList[index].readonly = true;
        departmentvm.depList[index].modifyClass = "showIcon";
        departmentvm.depList[index].saveClass = "hideIcon";
        departmentvm.listDepartment();
    },
    modifyDep: function (index, depid, name) {
        $.ajax({
            type: "post",
            url: 'updateDepartment.action',
            data: {
                "positionid": depid,
                "name": name
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    departmentvm.listDepartment();
                    departmentvm.editStatus = false;
                    departmentvm.depList[index].readonly = true;
                    departmentvm.depList[index].modifyClass = "showIcon";
                    departmentvm.depList[index].saveClass = "hideIcon"
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    removeDep: function (depid) {
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: 'deleteDepartment.action',
            data: {
                "departmentid": depid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    departmentvm.listDepartment();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newDepartment: "",
    createDep: function () {
        if (departmentvm.newDepartment=="") {
            alert("部门名字不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createDepartment.action',
            data: {
                "name": departmentvm.newDepartment
            },
            dataType: "json",
            success: function (data) {
                alert(data.retMSG);
                departmentvm.newDepartment = "";
                departmentvm.listDepartment();
                $('#depTab a:first').tab('show');
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
});
departmentvm.initRole();
departmentvm.listDepartment();