
export const Config = {

  live_domain: 'live.nexstepapps.com:8284',
  protocol: 'http',
  listLimit: 20,

  localUrl : 'http://1.255.255.20:8080/TnEV1_0AWeb/WebService/Login/SyncMastersWebService',


  //Common Login Url
  get commonLoginUrl() {
    return (
      this.protocol +
      '://' +
      this.live_domain +
      '/NexstepWebService/mobileLinkResolver.service'
    );
  },

  loginUrl: function(baseUrl){
    return (
      baseUrl + 'LoginWebService'
    );
  },

  // ---------------------------------- INVOICE WEBSERVICES [START] ---------------------------------- //
  fetchVoucherList: function(baseUrl){
    return (
      baseUrl + 'FetchVoucherList'
    );
  },

  fetchVoucherDetails: function(baseUrl){
    return (
      baseUrl + 'FetchVoucherDetails'
    );
  },

  syncMastersWebService:  function(baseUrl){
    return (
      baseUrl + 'SyncMastersWebService'
    );
  },

  saveInvoice:  function(baseUrl){
    return (
      baseUrl + 'SyncInvoiceVoucherWebService'
    );
  },

  sendForApprovalWebService:  function(baseUrl){
    return (
      baseUrl + 'SyncInvoiceVoucherWebService'
    );
  },

  approveRejectWebService:  function(baseUrl){
    return (
      baseUrl + 'SyncInvoiceVoucherWebService'
    );
  },

  // ---------------------------------- INVOICE WEBSERVICES [END] ---------------------------------- //
  
  // ---------------------------------- PR WEBSERVICES [START] ---------------------------------- //
  
  savePrVoucher: function(baseUrl){
    return (
      baseUrl + 'SyncPRVoucherWebService'
    );
  },

  sendForApprovalPrVoucher: function(baseUrl){
    return (
      baseUrl + 'SyncPRVoucherWebService'
    );
  },

  approveRejectPr:  function(baseUrl){
    return (
      baseUrl + 'SyncPRVoucherWebService'
    );
  },
  
  fetchPrList: function(baseUrl){
    return (
      baseUrl + 'FetchVoucherList'
    );
  },

  fetchPrDetails: function(baseUrl){
    return (
      baseUrl + 'FetchVoucherDetails'
    );
  },
  // ---------------------------------- PR WEBSERVICES [END] ---------------------------------- //

  //------------------------------------ ASSET WEBSERVICES [START] -----------------------------//
  fetchAssetList: function(baseUrl){
    return (
      baseUrl + 'FetchAssetList'
    );
  },

  fetchAssetDetails: function(baseUrl){
    return (
      baseUrl + 'FetchAssetDetails'
    );
  },

  barcodeWebservice: function(baseUrl){
    return (
      baseUrl + 'BarcodeWebservice'
    );
  },
//------------------------------------ ASSET WEBSERVICES [END] -----------------------------//


};