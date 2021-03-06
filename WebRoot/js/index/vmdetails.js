/**
 * Created by zhousicong on 2016/1/7.
 */
var vmdetaisvm = avalon.define({
    $id: 'vmdetailsvm',
    vmid: getUrlVars()["vmid"],
    appenvs: [],
    vmip: "",
    getVminfoById: function() {
        zajax({
            type: "post",
            url: "findVmInfoById.action",
            data: {
                "vminfoid": vmdetaisvm.vmid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    vmdetaisvm.vmip = data.vminfo.ip;
                    vmdetaisvm.getAppEnvsByVmID();
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
    getAppEnvsByVmID: function() {
        zajax({
            type: "post",
            url: "findApplicationEnvsByVminfoId.action",
            data: {
                "vminfoid": vmdetaisvm.vmid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.appenvs;
                    vmdetaisvm.appenvs = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
});

avalon.ready(function() {
    vmdetaisvm.getVminfoById();
});