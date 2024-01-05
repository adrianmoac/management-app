import {supabase} from './supabaseClient'

export async function getCostData() {
    try {
        const { data, error } = await supabase
            .from('importe')
            .select('*, categoria(id_categoria, nombre)');

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

export async function getCategories() {
    try {
        const { data, error } = await supabase
            .from('categoria')
            .select('*');

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

export async function getSavings() {
    try {
        const { data, error } = await supabase
            .from('cuentas')
            .select('*');

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

export async function insertNewCost(type, cost, date, category, repeat, description) {
    try {
        const { data, error } = await supabase
            .from('importe')
            .insert({tipo: type, fecha: date, id_categoria: category, repeticion: repeat, descripcion: description, importe: cost});

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

export async function insertNewCategory(name) {
    try {
        const { data, error } = await supabase
            .from('categoria')
            .insert({nombre: name});

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

export async function upsertSavings(savings) {
    try {
        const { data, error } = await supabase
            .from('cuentas')
            .update({ahorro: savings})
            .eq('id', 1);

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

export async function upsertAvailableMoney(savings) {
    try {
        const { data, error } = await supabase
            .from('cuentas')
            .update({disponible: savings})
            .eq('id', 1);

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