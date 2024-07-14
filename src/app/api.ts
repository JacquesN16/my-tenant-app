export const fetchProfileList = async () => {
    const res = await fetch('../data/profiles.json')
    console.log('RES',res, await res.json())
    // const json = await res.json()
    // console.log('JOSN',json)
    // return json
}