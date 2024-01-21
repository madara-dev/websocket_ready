const mongoose = require('mongoose');
// const nanofuck = require('./nano')
mongoose.connect('mongodb+srv://users:indra222@cluster0.ujnr2uh.mongodb.net/WebSocket');
// mongoose.connect('mongodb://127.0.0.1:27017/clickCounter');



const UserSchema = new mongoose.Schema({
  address: String,
  twitter: String,
  discord: String,
  quote_link: String,
  zily_username: String
});
const userModel = mongoose.model('users', UserSchema);


async function addressFinder(param) {
  const address = await (await userModel.find({ address: param }).exec()).pop()

  if (address) {
    return address
  } else {
    return false
  }

}

async function attribute_adder(param) {

  const details = await JSON.parse(param)
  const address = await (await userModel.find({ address: details.address }).exec()).pop()
  // console.log(details);
  if (address) {

    if (details.task === "twitter") {
      try {
        await userModel.updateOne({ address: details.address }, { twitter: details.twitter_id })
        return { twitter: "success" }
        
      } catch (error) {
        return {error}
      }

    } else if (details.task === "discord") {
      try {
        await userModel.updateOne({ address: details.address }, { discord: details.discord_id })
        
        return { twitter: "success" }
      } catch (error) {
        return {error}
      }

    } else if (details.task === "quote_link") {
      try {
        await userModel.updateOne({ address: details.address }, { quote_link: details.quote_link })
        return { twitter: "success" }
        
      } catch (error) {
        return {error}
      }


    } else if (details.task === "zily_username") {
      try {
        await userModel.updateOne({ address: details.address }, { zily_username: details.zily_username })
        return { twitter: "success" }
        
      } catch (error) {
        return {error}
      }

    }

  } else {

    return ""

  }

}


module.exports = { userModel, addressFinder, attribute_adder }
