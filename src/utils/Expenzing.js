import axios from 'axios';
import _ from './Var';
import ApiKeys from './ApiKeys'

const Debug = true;

const Expenzing = {
  get: function (uri, params) {
    return s.exist(s.key(uri, params))
      ? s.get(uri, params)
      : this._get(uri, params);
  },

  post: function (uri, params) {
    return this._post(uri, params);
  },

  ok: function (res) {
    return (
      res.status === 200 &&
      res.data !== null &&
      _.get(res, 'data.Status', '') === ApiKeys.SUCCESS
    );
  },

  newInvoiceSuccess: function (res) {
    return (
      res.status === 200 &&
      res.data !== null &&
      _.get(res, 'data.status', '') === ApiKeys.SUCCESS
    );
  },

  newInvoiceFailure: function (res) {
    return (
      _.get(res, 'data.status', '') === ApiKeys.FAILURE
    )
  },

  newInvoiceError: function (res) {
    return (
      _.get(res, 'data.Status', '') === ApiKeys.ERROR
    )
  },

  sendForApprovalSuccess: function (res) {
    return (
      res.status === 200 &&
      res.data !== null &&
      _.get(res, 'data.status', '') === ApiKeys.SUCCESS
    );
  },

  sendForApprovalFailure: function (res) {
    return (
      _.get(res, 'data.status', '') === ApiKeys.FAILURE
    )
  },

  sendForApprovalError: function (res) {
    return (
      _.get(res, 'data.Status', '') === ApiKeys.ERROR
    )
  },

  sendForApprovalPrError: function (res) {
    return (
      _.get(res, 'data.status', '') === ApiKeys.ERROR
    )
  },

  approveRejectSuccess: function (res) {
    return (
      res.status === 200 &&
      res.data !== null &&
      _.get(res, 'data.status', '') === ApiKeys.SUCCESS
    );
  },

  approveRejectFailure: function (res) {
    return (
      _.get(res, 'data.status', '') === ApiKeys.FAILURE
    )
  },

  approveRejectError: function (res) {
    return (
      _.get(res, 'data.Status', '') === ApiKeys.ERROR
    )
  },

  failure: function (res) {
    return (
      _.get(res, 'data.Status', '') === ApiKeys.FAILURE
    )
  },

  commonLoginOk: function (res) {
    return (
      res.status === 200 &&
      res.data !== null &&
      _.get(res, 'data.status', '') === ApiKeys.SUCCESS
    );
  },

  lower: function (array) {
    let results = [];
    if (array.length) {
      for (let i = 0; i < array.length; i++) {
        results[i] = {
          label: array[i].Label,
          value: array[i].Value,
        };
      }
    }

    return results;
  },

  _get: async (uri, params) => {
    const data = await axios.get(uri, params);

    // debug tracker
    //if (Debug) console.log('GET', uri, params, data);

    return data;
  },

  _post: async (uri, params) => {
    const data = await axios.post(uri, params);

    // debug tracker
    //if (Debug) console.log('POST', uri, params, data);
    return data;
  },

  convertDate: function (str, dateFormat) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    let convertedMonth = '';
    switch (mnth) {

      case '01':
        convertedMonth = 'Jan';
        break;

      case '02':
        convertedMonth = 'Feb';
        break;

      case '03':
        convertedMonth = 'Mar';
        break;

      case '04':
        convertedMonth = 'Apr';
        break;

      case '05':
        convertedMonth = 'May';
        break;

      case '06':
        convertedMonth = 'Jun';
        break;

      case '07':
        convertedMonth = 'Jul';
        break;

      case '08':
        convertedMonth = 'Aug';
        break

      case '09':
        convertedMonth = 'Sep';
        break;

      case '10':
        convertedMonth = 'Oct';
        break;

      case '11':
        convertedMonth = 'Nov';
        break;

      case '12':
        convertedMonth = 'Dec';
        break;

    }
    let value = 'Error';
    if(dateFormat === '0'){
      value = [day, convertedMonth, date.getFullYear()].join("-"); // returns -- > 17-Feb-2020 
    } 
    
    if(dateFormat === '1') {
      value = [day, mnth, date.getFullYear()].join("/"); // returns -- > 27/02/2020
    }

    return value;
  }
};

export default Expenzing;