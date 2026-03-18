const test = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: 'python', code: 'print("Hello from Docker!")' })
        });
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch(err) {
        console.error("Test failed", err);
    }
};
test();
