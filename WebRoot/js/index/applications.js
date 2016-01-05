/**
 * Created by zhousicong on 2016/1/4.
 */
var appsvm = avalon.define({
    $id: 'appsvm',
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
                    appsvm.depList = temArr;
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
    applicationsTypeList: [],
    listAppType: function () {
        $.ajax({
            type: "post",
            url: 'listApplicationTypes.action',
            dataType: "json",
            success: function (data) {
                var temArr = [];
                temArr = data.apptypes;
                appsvm.applicationsTypeList = temArr;
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
                appsvm.envsList = temArr;
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
        appsvm.listEnvs();
        $.ajax({
            type: "post",
            url: 'listApplications.action',
            data: {
                "pageindex": appsvm.jpageIndex,
                "pagesize": appsvm.jpageSize,
                "domain": appsvm.conAppDomain,
                "applicationtypeid": appsvm.conAppTypeId,
                "departmentid": appsvm.conAppDepId
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
                    for (j = 0; j < appsvm.envsList.length; j++) {
                        var isInEnvArr = false;
                        var temAppEnvObj = new Object();
                        temAppEnvObj.appid = temAppsArr[i].id;
                        temAppEnvObj.appValue = temAppsArr[i].domain;
                        temAppEnvObj.envid = appsvm.envsList[j].id;
                        temAppEnvObj.envValue = appsvm.envsList[j].name;
                        for (var k = 0; k < temAppsEnvidStringToArr.length; k++) {
                            if (temAppsEnvidStringToArr[k] && temAppsEnvidStringToArr[k] == appsvm.envsList[j].id) {
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
                appsvm.applicationsList = temAppsArr;
            }
            ,
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    showAppEnvDomain: "",
    showAppEnvValue: "",
    showAppEnvVmIp: "",
    showAppEnvDNSIP: "",
    showAppEnvLocalPort: "",
    showAppEnvPort: "",
    loadShowAppEnvModal: function (appId, envId) {
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
                    appsvm.showAppEnvDomain = data.appenv.application.domain;
                    appsvm.showAppEnvValue = data.appenv.env.name;
                    appsvm.showAppEnvVmIp = data.appenv.vminfo.ip;
                    appsvm.showAppEnvDNSIP = data.appenv.env.dns;
                    appsvm.showAppEnvLocalPort = data.appenv.localport;
                    appsvm.showAppEnvPort = data.appenv.port;
                    $('#showAppEnvModal').modal('show');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    pagesize10: "10",
    pagesize10Cls: "pageSizeSelected",
    pagesize20: "20",
    pagesize20Cls: "",
    pagesize50: "50",
    pagesize50Cls: "",
    changePageSize: function (pgsize) {
        appsvm.jpageSize = pgsize;
        appsvm.listApp("init");
    }
});

appsvm.listApp("init");
appsvm.listDepartment();
appsvm.listAppType();

appsvm.$watch("jpageSize", function (newValue) {
    appsvm.pagesize10Cls = "";
    appsvm.pagesize20Cls = "";
    appsvm.pagesize50Cls = "";
    if (newValue == appsvm.pagesize10) {
        appsvm.pagesize10Cls = "pageSizeSelected";
    }
    else if (newValue == appsvm.pagesize20) {
        appsvm.pagesize20Cls = "pageSizeSelected";
    }

    else if (newValue == appsvm.pagesize50) {
        appsvm.pagesize50Cls = "pageSizeSelected";
    }
})