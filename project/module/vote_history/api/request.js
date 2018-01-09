/**
 * Created by Lanny on 2018/1/8.
 */
import httpPost from '../../../../core/api/baseRequest'
import Urls from './url.js'

export const getVoteHistoryList = (self, params, successCallback, failCallback, handleError) => {
  httpPost(self, Urls.getVoteHistoryList, params, successCallback, failCallback, handleError)
};

export const getVoteHistoryDetail = (self, params, successCallback, failCallback, handleError) => {
  httpPost(self, Urls.getVoteHistoryDetail, successCallback, failCallback, handleError)
};
