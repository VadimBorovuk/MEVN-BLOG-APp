// import {serviceTrigger} from "../utils/request";
//
// export function geListOfBrands(filters, page, sortData) {
//   let url = `/v1/brand/get?page=${page}`;
//
//   if (Object.keys(filters).length) {
//     for (let key in filters) {
//       url += `&filter[${key}]=${filters[key]}`
//     }
//   }
//   if (sortData && sortData.length > 0) {
//     url += `&sort=${sortData}`
//   }
//
//   return serviceTrigger({
//     url: url,
//     method: 'get'
//   })
// }
