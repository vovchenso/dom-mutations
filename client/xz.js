(function() {

    const BASE_URL = 'http://localhost:3000';
    const LOG_URL = `${BASE_URL}/log`;

    const _getAttrs = function(node) {
        if (node.attributes.length > 0) {
            const result = {};
            for (const attr of node.attributes) {
                result[attr.name] = attr.value;
            }
            return result;
        }

        return null;
    };

    const _parseNodes = function(nodes) {
        const result = [];
        for (const [, node] of nodes.entries()) {
            result.push({
                name: node.nodeName,
                attrs: _getAttrs(node)
            });
        }

        return result;
    };

    const _log = function(data) {
        fetch(LOG_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        }).catch(function(err) {
            console.warn(err);
        });
    };

    const _modifyCallback = function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length > 0) {
                const data = _parseNodes(mutation.addedNodes);
                _log(data);
            }
        }
    };

    const _init = function() {
        const targetNode = document.getElementsByTagName('body')[0];

        const config = {
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true
        };

        const observer = new MutationObserver(_modifyCallback);
        observer.observe(targetNode, config);
    };

    return {
        run: function() {
            window.addEventListener('load', _init, false);
        }
    };

})().run();