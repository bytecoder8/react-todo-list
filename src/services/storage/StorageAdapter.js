class StorageAdapter {
  constructor(name) {
    this.name = name
  }

  loadData() {
    throw new Error('Not implemented')
  }

  saveData(data) {
    throw new Error('Not implemented')
  }
}

export default StorageAdapter
