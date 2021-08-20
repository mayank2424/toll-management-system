/**
 * Date Helper
 */
const moment = require('moment');

exports.getDateDiff = (date1, date2, differentiator = 'hours') => moment(date1).diff(moment(date2), differentiator);

exports.now = () => moment().toDate();

exports.format = (date, format =  'DD/MM/YY') => moment(date).format(format);

exports.toUtc = (date) => moment(date).utc()

exports.toUtcFormat = (date, format) => moment.utc(date).format(format)

exports.add = (date, type = 'days', count = 1) => moment(date).add(type, count);

exports.date = () => moment()