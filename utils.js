export const obtenerTareas = async () => {
    const response = await fetch(
        "https://raw.githubusercontent.com/jeanalo/tallerclase24/desarrollo/data.json"
    );
    const data = await response.json();
    return data;
};
