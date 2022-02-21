const ul = document.querySelector('ul');

ul.addEventListener('click', async(ev)=>{
    if(ev.target.tagName === 'LI'){
        const id = ev.target.getAttribute('data-id');
        await axios.delete(`/colors/${id}`);
        console.log(id);
        setUp();
    }
});

const setUp = async()=>{
    const response = await axios.get('/colors');
    const colors = response.data;

    const html = colors.map(color=>{
        return `
            <li data-id='${color.id}'>${color.name}</li>
        `
    }).join('');

    ul.innerHTML = html;
};

setUp();