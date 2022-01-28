

  const cloudinary = require('cloudinary').v2;
  const path = require('path');
  const config = require(path.resolve('utilities/configuration.js'));
  const {cloudinaryCloudName, cloudinaryApiKey, CloudinaryApiSecret,cloudinarySecure} = config;
  const helper = require(path.resolve('utilities/helper.js'));


  class Cloud{

      //Setup for cloudinary configuration
      constructor(configCloudinary = {} ) {
          this.cloudName = configCloudinary.cloudName || cloudinaryCloudName;
          this.cloudApiKey = configCloudinary.cloudApiKey || cloudinaryApiKey;
          this.cloudApiSecret = configCloudinary.cloudApiSecret || CloudinaryApiSecret;
          this.cloudSecure = configCloudinary.cloudSecure  || cloudinarySecure;
          this.folder = config.folder || test;
          this.type = configs.type || "upload";
          this.signUrl = this.type == ("authenticated" || "private") ? true : false
      }
        
      Config() {
        cloudinary.config({ cloudName: this.cloudName, apiKey: this.cloudApiKey, apiSecret: this.cloudApiSecret, secure: this.cloudSecure });
        return cloudinary;
    }
    
    //Setting up  uploading file
    upload(img, options = {}) {
        options.public_id = options.public_id || `${path.basename(img).split('.')[0]}`;
        options.folder = options.folder || this.folder;
        options.type = options.type || this.type;

        const res = this.Config().uploader.upload(img, options, (err, result) => {
            if (err) {
                // deletes the local file
                helper.deleteFileFrom(img, () => console.log("local file deleted"));
                throw err;
            } else return result;
        });

        return res;
    }

    async delete(public_id, options = {}) {
            options.type = options.type || this.type;
            options.signUrl = options.signUrl || this.signUrl;
            options.resource_type = options.resource_type;
            // let folder = options.folder || this._folder;
            options.invalidate = options.invalidate || true;

            const res = this.Config().api.delete_resources(public_id, options, (err, res) => {
                if (err) throw err;
                else return res;
            });

            return res;
        }
        /**
         * 
         * @param {string} public_id - image public_id
         * @param {object} options - cloudinary options
         * @returns returns the updated item
         */
    update(file, options = {}) {
        options.overwrite = true;
        options.invalidate = true;
        options.type = options.type || this._type;
        const res = this.Config().uploader.upload(file, options, (err, result) => {
            if (err) {
                // deletes the local file
                helper.deleteFileFrom(img, () => console.log("local file deleted"));
                throw err;
            } else return result;
        });
        return res;
    }

    get(public_id, options = {}) {
        // options.folder = options.folder || this._folder;
        options.type = options.type || this._type;
        options.signUrl = options.signUrl || this.signUrl;

        return this.Config().url(public_id, options);
    }

}

module.exports = Cloud

  