const sharp = require('sharp');
const path = require('path');
const logger = require('../config/logger');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async save(buffer, filepath) {          
    try {
      await sharp(buffer)
        .resize(500, 500, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .withMetadata()
        .toFile(filepath);
      } catch(e) {
        logger.error(e);
      }
    
    return filepath;
  }  
}


module.exports = Resize;