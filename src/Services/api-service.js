const URL = "https://web-react-base-default-rtdb.europe-west1.firebasedatabase.app/List.json";

export const getAllContacts = () => {
    const allContacts = fetch(URL).then(response => {
        return response.json();
    }).then(data => {
        return data;
    })
        .catch(err => {
            return err;
        });

    return allContacts;
}

export const updateContacts = (contacts) => {
    fetch(URL, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacts)
    })
}