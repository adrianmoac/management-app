import {supabase} from './supabaseClient'

export async function getCostData() {
    try {
        const { data, error } = await supabase
            .from('importe')
            .select('*, categoria(id_categoria, nombre)')
            .order('fecha', {ascending: false});

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}

export async function getCostDataById(id) {
    try {
        const { data, error } = await supabase
            .from('importe')
            .select('*, categoria(id_categoria, nombre)')
            .eq('id', id);

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}

export async function getDataByDateRange(initialDate, finalDate) {
    try {
        const { data, error } = await supabase
            .from('importe')
            .select('*, categoria(id_categoria, nombre)')
            .gt('fecha', initialDate)
            .lt('fecha', finalDate)
            .order('fecha', {ascending: false})

        if (error) {
            console.error("Error fetching data:", error);
        } else {
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
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}

export async function insertNewCost(type, cost, date, category, repeat, description, account) {
    try {
        const { data, error } = await supabase
            .from('importe')
            .insert({tipo: type, fecha: date, id_categoria: category, repeticion: repeat, descripcion: description, importe: cost, cuenta: account});

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}

export async function updateCost(id, type, cost, date, category, repeat, description, account) {
    try {
        const { data, error } = await supabase
            .from('importe')
            .update({tipo: type, fecha: date, id_categoria: category, repeticion: repeat, descripcion: description, importe: cost, cuenta: account}).eq('id', id)

        if (error) {
            console.error("Error fetching data:", error);
        } else {
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
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}

export async function deleteImport(id) {
    try {
        const { data, error } = await supabase
            .from('importe')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            return data; // You might want to return the data
        }
    } catch (error) {
        console.error("Error in getInfoImporte:", error);
        throw error;
    }
}