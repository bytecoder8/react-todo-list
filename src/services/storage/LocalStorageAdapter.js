import StorageAdapter from './StorageAdapter'


class LocalStorageAdapter extends StorageAdapter {
  loadData() {
    const str = localStorage.getItem(this.name)
    if (str === null || str.length === 0) {
      return null
    }
    return JSON.parse(str)
  }

  saveData(data) {
    localStorage.setItem(this.name, JSON.stringify(data))
  }
}

export default LocalStorageAdapter
