import axios from "axios";

export const mockedAPI = {
    getProducts(){
        return axios.get("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/product", {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(responce => responce);
    },
    getProductById(id)  {
        return axios.get("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/product/"+id , {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(responce => responce);
    },
    updateProductData(newData, id) {
        return axios.put("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/product/"+id, newData).then(response => response);
    },
    deleteProduct(id) {
        return axios.delete("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/product/"+id).then(response => response);
    },
    createNewProduct(data) {
        return axios.post("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/product/", data).then(response => response);
    },
    deleteComment(id) {
        return axios.delete("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/comments/"+id).then(response => response);
    },
    getComments() {
        return axios.get("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/comments/").then(response => response);
    },
    uploadComment(data) {
        return axios.post("https://607e20ba02a23c0017e8add9.mockapi.io/api/v1/comments/", data).then(response => response);
    }
};

