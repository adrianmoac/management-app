import {supabase} from './supabaseClient'

export async function getCostData() {
    try {
        const { data, error } = await supabase
            .from('importe')
            .select('*, costo(id_importe, importe), categoria(id_categoria, nombre)');

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            console.log("Fetched data:", data);
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}