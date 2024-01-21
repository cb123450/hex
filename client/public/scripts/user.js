const test = true;
const domain = "";
const local = 'https://localhost';
const hex = 'https://hexgame0.com'

export async function putUser(mode, _email, _nickname){
    try{
        const domain = mode ? hex : local;
        let res = await axios({
            url: domain + '/user',
            method: 'put',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: _email,
                nickname: _nickname }
        })
        if (res.status == 500){
            console.log(res.data.error)
        }
        else if (res.status == 409){
            console.log(res.data.error);
        }
        else if (res.status == 200){
            console.log(res.data);
        }
        return res.data 
    }
    catch (e){
        if (e.response && e.response.data && e.response.data.error) {
            console.error(e.response.data.error);
        }
        else{
            console.error("An unknown error occurred");
        }
    }
}

export async function getUsers(mode) {
    try {
        const domain = mode ? hex : local;
        let res = await axios({
            url: domain + '/user',
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.status == 200){
            //console.log(res.status)
        }
        return res.data
    }
    catch (e){
        console.error(e);
    }
}

