async function fetchAddressFromCep() {
    const cep = document.querySelector("#cep").value.trim();

    if (/^[0-9]+$/.test(cep)) { // Apenas verifica se o CEP contém números
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok || !response.headers.get("Content-Type").includes("application/json")) {
                throw new Error("Erro ao buscar o CEP");
            }

            const data = await response.json();
            if (data.erro) {
                alert("CEP não encontrado");
                return;
            }

            preencherCamposEndereco(data);
        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
            alert("Não foi possível buscar o endereço. Tente novamente mais tarde.");
        }
    } else {
        alert("Digite um CEP válido contendo apenas números");
    }
}

function preencherCamposEndereco(data) {
    document.querySelector("#rua").value = data.logradouro || "";
    document.querySelector("#bairro").value = data.bairro || "";
    document.querySelector("#cidade").value = data.localidade || "";
    document.querySelector("#estado").value = data.uf || "";
    document.querySelector("#pais").value = "Brasil";
}

document.querySelector("#user-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.querySelector("#nome").value,
        sexo: document.querySelector("#sexo").value,
        cep: document.querySelector("#cep").value,
        rua: document.querySelector("#rua").value,
        bairro: document.querySelector("#bairro").value,
        cidade: document.querySelector("#cidade").value,
        estado: document.querySelector("#estado").value,
        pais: document.querySelector("#pais").value,
    };

    try {
        const response = await fetch("http://localhost:3000/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar os dados");
        }

        const resultado = await response.text();
        alert(resultado);
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Não foi possível salvar os dados. Tente novamente.");
    }
});
