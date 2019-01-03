/* eslint-disable */
export function bindEventName(key, id) {
  return key + '//' + id
}
export function formatData(data) {
  let d = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].productId == 'zWpmiNWIMKJNHOUq') {
      d.push(data[i])
    }
  }
  return d
}
export function formatShareData(data) {
  let d = []
  for (let i = 0; i < data.length; i++) {
    if (!data[i].isShare) {
      d.push(data[i])
    }
  }

  return d
}
