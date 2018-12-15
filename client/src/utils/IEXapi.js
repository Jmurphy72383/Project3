import axios from "axios";

export default {
  search: function(querySymbol) {
    return axios.get("https://api.iextrading.com/1.0//stock/" + querySymbol + "/batch?types=quote,news,chart&range=1m&last=7");
  }
};