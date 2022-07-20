export function fetchSources() {
    let sources = [];
    if (fetchPackages() === null || fetchPackages === []) {
        return [];
    } else {
        const list = fetchPackages();
        for (let i = 0; i < list.length; i++) {
            sources.push(list[i].link);
        }
        return sources;
    }
}

export function fetchPackages() {
    if (JSON.parse(localStorage.getItem('packages')) === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('packages'));
    }
}

export function addPackage(channelTitle, channelDescription, channelLink) {
    if (localStorage.getItem('packages') === null) {
        localStorage.setItem('packages', JSON.stringify([{'title': channelTitle, 'description': channelDescription, 'link': channelLink}]));
    }
    else {
        if (packageExists(channelTitle, channelDescription, channelLink) === true) {
            return;
        } else {
            let packages = fetchPackages();
            packages.push(
                {
                    'title': channelTitle,
                    'description': channelDescription,
                    'link': channelLink
                }
            );
            localStorage.setItem('packages', JSON.stringify(packages));
            }
    }
}

export function setPackages(newPackages) {
    localStorage.setItem('packages', newPackages);
}

export function removePackage(channelTitle, channelDescription, channelLink) {
    if ((fetchPackages() === null || fetchPackages() === []) && (packageExists(channelTitle, channelDescription, channelLink) === false)) {
        return;
    } else {
        let list = fetchPackages();
        const temp = JSON.stringify({'title': channelTitle, 'description': channelDescription, 'link': channelLink});
        for (let i = 0; i < list.length; i++) {
            if (temp === JSON.stringify(list[i])) {
                list.splice(i, 1);
            }
        }
        localStorage.setItem('packages', JSON.stringify(list));
    }
}

export function packageExists(channelTitle, channelDescription, channelLink) {
    let items = fetchPackages();
    if (items === null) {
        return false;
    }
    const temp = JSON.stringify({'title': channelTitle, 'description': channelDescription, 'link': channelLink});
    for (let i = 0; i < items.length; i++) {
        if (temp === JSON.stringify(items[i])) {
            return true;
        }
    }
    return false;
}

export function fetchSavedItems() {
    if (JSON.parse(localStorage.getItem('saved')) === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('saved'));
    }
}

export function saveItem(itemTitle, itemDescription, itemLink) {
    if (localStorage.getItem('saved') === null) {
        localStorage.setItem('saved', JSON.stringify([{'title': itemTitle, 'description': itemDescription, 'link': itemLink}])
        );
    }
    else {
        if (itemExists(itemTitle, itemDescription, itemLink) === true) {
            return;
        } else {
            let items = fetchSavedItems();
            items.push(
                {
                    'title': itemTitle,
                    'description': itemDescription,
                    'link': itemLink
                }
            );
            localStorage.setItem('saved', JSON.stringify(items));
            }
    }
}

export function itemExists(itemTitle, itemDescription, itemLink) {
    let items = fetchSavedItems();
    if (items === null) {
        return false;
    }
    const temp = JSON.stringify({'title': itemTitle, 'description': itemDescription, 'link': itemLink});
    for (let i = 0; i < items.length; i++) {
        if (temp === JSON.stringify(items[i])) {
            return true;
        }
    }
    return false;
}

export function removeItem(itemTitle, itemDescription, itemLink) {
    if ((fetchSavedItems() === null || fetchSavedItems === []) && (itemExists(itemTitle, itemDescription, itemLink) === false)) {
        return;
    } else {
        let list = fetchSavedItems();
        const temp = JSON.stringify({'title': itemTitle, 'description': itemDescription, 'link': itemLink});
        for (let i = 0; i < list.length; i++) {
            if (temp === JSON.stringify(list[i])) {
                list.splice(i, 1);
            }
        }
        localStorage.setItem('saved', JSON.stringify(list));
    }
}

export function clearData() {
    localStorage.clear();
}

export function exportPackages() {
    if (localStorage.getItem('packages') === null) {
        alert('There are currently no saved packages!');
    } else {
        let a = document.createElement('a');
        let exportFile = new Blob([localStorage.getItem('packages')], {type: 'application/json;charset=utf-8;'});
        a.href = URL.createObjectURL(exportFile);
        a.download = 'packages.json';
        a.click();
    }
}