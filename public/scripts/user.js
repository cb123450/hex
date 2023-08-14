const test = true;
const domain = test ? 'http://localhost:3000':'http://44.217.57.246/';

export async function putUser(user){
    try{
        let res = await axios({
            url: domain + '/user',
            method: 'put',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                    name: user.name}
        })
        if (res.status == 200){
            console.log(res.status)
        }
        return res.data 
    }
    catch (e){
        console.error(e);
    }
}

export async function getUsers() {
    try {
        let res = await axios({
            url: domain + '/user',
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.status == 200){
            console.log(res.status)
        }
        return res.data
    }
    catch (e){
        console.error(e);
    }
}

