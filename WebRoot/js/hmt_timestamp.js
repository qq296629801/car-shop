window.hmc_timestamp = window.hmc_timestamp || {
    timestamp: (function () {
        
        var date = new Date();
        return "02" + date.getFullYear() + (date.getMonth()+1) + date.getDate();
    })()
};