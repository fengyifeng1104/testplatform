/**
 * Created by zhousicong on 2015/12/25.
 */
var appinfovm = avalon.define({
    $id: 'appinfovm',
    //Apptype Start
    newAppType: "",
    newAppTypeRemark: "",
    loadAddAppTypeModal: function () {
        appinfovm.newAppType = "";
        appinfovm.newAppTypeRemark = "";
        $('#addAppTypeModal').modal('show');
    },
    createAppType: function () {
        $.ajax({
            type: "post",
            url: 'createApplicationType.action',
            data: {
                "type": appinfovm.newAppType,
                "typeremark": appinfovm.newAppTypeRemark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    appinfovm.listAppType();
                    $('#addAppTypeModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    applicationsTypeList: [],
    listAppType: function () {
        $.ajax({
            type: "post",
            url: 'listApplicationTypes.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.apptypes;
                appinfovm.applicationsTypeList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyAppTypeId: "",
    modifyAppType: "",
    modifyAppTypeRemark: "",
    loadModifyAppTypeModal: function (index) {
        appinfovm.modifyAppTypeId = appinfovm.applicationsTypeList[index].id;
        appinfovm.modifyAppType = appinfovm.applicationsTypeList[index].type;
        appinfovm.modifyAppTypeRemark = appinfovm.applicationsTypeList[index].remark;
        $('#modifyAppTypeModal').modal('show');
    },
    saveAppType: function () {
        $.ajax({
            type: "post",
            url: 'updateApplicationType.action',
            data: {
                "applicationtypeid": appinfovm.modifyAppTypeId,
                "type": appinfovm.modifyAppType,
                "typeremark": appinfovm.modifyAppTypeRemark
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    appinfovm.listAppType();
                    $('#modifyAppTypeModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    lodApptypeTAB: function () {
        appinfovm.listAppType();
        $('#apptype').tab('show');
    },
    //AppType END

    //App Start
    newAppDomain: "",
    newAppName: "",
    newAppTypeId: "",
    newAppRemark: "",
    newAppDepId: "",
    loadAddAppModal: function () {
        appinfovm.newAppDomain = "";
        appinfovm.newAppName = "";
        appinfovm.newAppTypeId = "";
        appinfovm.newAppRemark = "";
        appinfovm.newAppDepId = "";
        appinfovm.listDepartment();
        appinfovm.listAppType();
        $('#addAppModal').modal('show');
    },
    depList: [],
    listDepartment: function () {
        $.ajax({
            type: "post",
            url: 'listDepartments.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.deps;
                    appinfovm.depList = temArr;
                }
                else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    envsList: [],
    listEnvs: function () {
        $.ajax({
            type: "post",
            url: 'listEnvs.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.envs;
                appinfovm.envsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    createApp: function () {
        if (appinfovm.newAppDomain == "" || appinfovm.newAppTypeId == "") {
            alert("站点域名或站点类型不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createApplication.action',
            data: {
                "applicationtypeid": appinfovm.newAppTypeId.trim(),
                "domain": appinfovm.newAppDomain.trim(),
                "name": appinfovm.newAppName.trim(),
                "remark": appinfovm.newAppRemark.trim(),
                "departmentid": appinfovm.newAppDepId.trim()
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    appinfovm.listApp();
                    $('#addAppModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    jpageIndex: 1,
    jpageSize: 10,
    applicationsList: [],
    conAppDomain: "",
    conAppDepId: "",
    conAppTypeId: "",
    listApp: function (tag) {
        appinfovm.listEnvs();
        $.ajax({
            type: "post",
            url: 'listApplications.action',
            data: {
                "pageindex": appinfovm.jpageIndex,
                "pagesize": appinfovm.jpageSize,
                "domain": appinfovm.conAppDomain,
                "applicationtypeid": appinfovm.conAppTypeId,
                "departmentid": appinfovm.conAppDepId
            },
            dataType: "json",
            success: function (data) {
                if (tag) {
                    $('#pagination').bootpag({total: data.pagenum});
                }
                var temAppsArr = [];
                var temAppsEnvidArr = [];
                temAppsArr = data.apps;
                temAppsEnvidArr = data.envids;
                for (var i = 0; i < temAppsEnvidArr.length; i++) {
                    var temAppsEnvidStringToArr = temAppsEnvidArr[i].split(",");
                    temAppsArr[i].appsEnvidArr = new Array();
                    for (j = 0; j < appinfovm.envsList.length; j++) {
                        var isInEnvArr = false;
                        var temAppEnvObj = new Object();
                        temAppEnvObj.appid = temAppsArr[i].id;
                        temAppEnvObj.appValue = temAppsArr[i].domain;
                        temAppEnvObj.envid = appinfovm.envsList[j].id;
                        temAppEnvObj.envValue = appinfovm.envsList[j].name;
                        for (var k = 0; k < temAppsEnvidStringToArr.length; k++) {
                            if (temAppsEnvidStringToArr[k] && temAppsEnvidStringToArr[k] == appinfovm.envsList[j].id) {
                                isInEnvArr = true;
                                break;
                            }
                        }
                        if (isInEnvArr) {
                            temAppEnvObj.exsit = true;
                        }
                        else {
                            temAppEnvObj.exsit = false;
                        }
                        temAppsArr[i].appsEnvidArr.push(temAppEnvObj);
                    }
                }
                appinfovm.applicationsList = temAppsArr;
            }
            ,
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    vmsList: [],
    listVMS: function () {
        $.ajax({
            type: "post",
            url: 'listVmInfos.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.vms;
                appinfovm.vmsList = temArr;
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    newAppEnvDomain: "",
    newAppEnvDomainID: "",
    newAppEnvValue: "",
    newAppEnvId: "",
    newAppEnvVmId: "",
    newAppEnvDNSIP: "",
    newAppEnvLocalPort: "",
    newAppEnvPort: "",
    loadAddAppEnvModal: function (appId, appValue, envId, envValue) {
        appinfovm.newAppEnvDomainID = appId;
        appinfovm.newAppEnvDomain = appValue;
        appinfovm.newAppEnvId = envId;
        appinfovm.newAppEnvValue = envValue;
        appinfovm.newAppEnvVmId = "";
        appinfovm.newAppEnvDNSIP = "";
        appinfovm.newAppEnvLocalPort = "";
        appinfovm.newAppEnvPort = "";
        appinfovm.listVMS();
        $('#addAppEnvModal').modal('show');
    },
    createAppEnv: function () {
        if (appinfovm.newAppEnvVmId == "") {
            alert("站点环境的隶属服务器不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createApplicationEnv.action',
            data: {
                "applicationid": appinfovm.newAppEnvDomainID,
                "envid": appinfovm.newAppEnvId,
                "vminfoid": appinfovm.newAppEnvVmId,
                "dnsip": appinfovm.newAppEnvDNSIP,
                "localport": appinfovm.newAppEnvLocalPort,
                "port": appinfovm.newAppEnvPort
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    appinfovm.listApp("init");
                    $('#addAppEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    modifyAppEnvDomain: "",
    modifyAppEnvDomainID: "",
    modifyAppEnvValue: "",
    modifyAppEnvId: "",
    modifyAppEnvVmId: "",
    modifyAppEnvDNSIP: "",
    modifyAppEnvLocalPort: "",
    modifyAppEnvPort: "",
    loadModifyAppEnvModal: function (appId, envId) {
        $.ajax({
            type: "post",
            url: 'findApplicationEnvByAppAndEnv.action',
            data: {
                "applicationid": appId,
                "envid": envId
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    appinfovm.listVMS();
                    appinfovm.modifyAppEnvDomain = data.appenv.application.domain;
                    appinfovm.modifyAppEnvDomainID = data.appenv.application.id;
                    appinfovm.modifyAppEnvValue = data.appenv.env.name;
                    appinfovm.modifyAppEnvId = data.appenv.env.id;
                    appinfovm.modifyAppEnvVmId = data.appenv.vminfo.id;
                    appinfovm.modifyAppEnvDNSIP = data.appenv.env.dns;
                    appinfovm.modifyAppEnvLocalPort = data.appenv.localport;
                    appinfovm.modifyAppEnvPort = data.appenv.port;
                    $('#modifyAppEnvModal').modal('show');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    saveAppEnv: function () {
        if (appinfovm.modifyAppEnvVmId == "") {
            alert("站点环境的隶属服务器不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'updateApplicationEnv.action',
            data: {
                "applicationid": appinfovm.modifyAppEnvDomainID,
                "envid": appinfovm.modifyAppEnvId,
                "vminfoid": appinfovm.modifyAppEnvVmId,
                "dnsip": appinfovm.modifyAppEnvDNSIP,
                "localport": appinfovm.modifyAppEnvLocalPort,
                "port": appinfovm.modifyAppEnvPort
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    appinfovm.listApp("init");
                    $('#modifyAppEnvModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    loadAppTAB: function () {
        appinfovm.listApp("init");
        appinfovm.listDepartment();
        appinfovm.listAppType();
        $('#app').tab('show');
    },
    //APP END

    removeItem: function (id, actionName, idName) {
        var actitonUrl = actionName + ".action";
        var params = '{"' + idName + '":' + id + '}';
        params = JSON.parse(params);
        var r = confirm("确认删除?")
        if (r == false) {
            return;
        }
        $.ajax({
            type: "post",
            url: actitonUrl,
            data: params,
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    if (actionName == "deleteApplication") {
                        appinfovm.listApp();
                    }
                    else if (actionName == "deleteApplicationType") {
                        appinfovm.listAppType();
                    }
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    }
});


if (isLogin()) {
    appinfovm.loadAppTAB();
}
else {
    model.redirectIndexPage();
}
