const fs = require('fs')

export const cacheData = (data: any) => {
    fs.writeFile('../data/records.json', JSON.stringify(data), (err: any) => {
      if (err) console.log('Error writing file:', err);
    })


  return "Done saving..."
}