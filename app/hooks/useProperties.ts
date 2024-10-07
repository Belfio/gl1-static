import { useEffect, useState } from "react";
import { OverviewPropertiesType, Property, PropertyData } from "@/lib/types";
import pp from "@/lib/propertyProcessing";

async function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("PropertyDB", 4); // Increment version if needed

    request.onupgradeneeded = (event) => {
      const db = request.result;
      console.log("Upgrading database...");
      if (!db.objectStoreNames.contains("properties")) {
        db.createObjectStore("properties", { keyPath: "id" });
        console.log("Created object store: properties");
      }
      if (!db.objectStoreNames.contains("propertyData")) {
        db.createObjectStore("propertyData", { keyPath: "id" });
        console.log("Created object store: propertyData");
      }
      if (!db.objectStoreNames.contains("propertyOverview")) {
        db.createObjectStore("propertyOverview", { keyPath: "id" });
        console.log("Created object store: propertyOverview");
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfully");
      resolve(request.result);
    };
    request.onerror = () => {
      console.error("Error opening database:", request.error);
      reject(request.error);
    };
  });
}

async function getPropertyOverviewFromDB(db: IDBDatabase) {
  return new Promise<OverviewPropertiesType | null>((resolve, reject) => {
    const transaction = db.transaction("propertyOverview", "readonly");
    const store = transaction.objectStore("propertyOverview");
    const request = store.get("propertyOverview");

    request.onsuccess = () =>
      resolve(request.result ? request.result.data : null);
    request.onerror = () => reject(request.error);
  });
}
async function savePropertyOverviewToDB(
  db: IDBDatabase,
  data: OverviewPropertiesType
) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("propertyOverview", "readwrite");
    const store = transaction.objectStore("propertyOverview");
    const request = store.put({ id: "propertyOverview", data });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function savePropertiesToDB(db: IDBDatabase, data: Property[]) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("properties", "readwrite");
    const store = transaction.objectStore("properties");
    console.log("Queste sono le proprietà che metto nello store", data);
    data.forEach((property) => {
      if (!property.id) {
        console.error("Property is missing 'id':", property);
        reject(new Error("Property is missing 'id'"));
        return;
      }
      const request = store.put({ ...property, id: property.id });
      request.onerror = () => reject(request.error);
    });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function savePropertyDataToDB(db: IDBDatabase, data: PropertyData) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("propertyData", "readwrite");
    const store = transaction.objectStore("propertyData");

    const request = store.put({ ...data, id: "1" });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function fetchPropertyOverview() {
  try {
    const db = await openDatabase();
    let data = await getPropertyOverviewFromDB(db);

    if (!data) {
      console.log("FETCHING overviewProperties");
      const propertyOverview = await pp.overviewProperties();
      if (propertyOverview) {
        await savePropertyOverviewToDB(db, propertyOverview);
        data = propertyOverview;
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching property overview:", error);
    return null;
  }
}

async function fetchPropertyData(): Promise<PropertyData | null> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction("propertyData", "readonly");
    const store = transaction.objectStore("propertyData");
    const request = store.getAll();

    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        let data: PropertyData = request.result;
        console.log("leggo se abbiamo data", data);
        if (!data) {
          console.log("FETCHING load Property Data");
          const propData = await pp.loadPropertyData();
          data = propData;
          await savePropertyDataToDB(db, data);
        }
        resolve(data);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error fetching property data:", error);
    return null;
  }
}
async function fetchProperties(): Promise<Property[] | null> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction("properties", "readonly");
    const store = transaction.objectStore("properties");
    const request = store.getAll();

    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        let data: Property[] = request.result as Property[];
        if (!data || data.length < 10) {
          console.log("FETCHING getProperties");
          const propertiesArray = await pp.getProperties(500);
          data = propertiesArray;
          await savePropertiesToDB(db, data);
        }
        resolve(data);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

export function useProperties(): {
  propertyOverview: OverviewPropertiesType | null;
  properties: Property[] | [];
  propertyData: PropertyData | null;
} {
  const [propertyOverview, setPropertyOverview] =
    useState<OverviewPropertiesType | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchPropertyOverview();
      setPropertyOverview(data);
      const data2 = await fetchPropertyData();

      setPropertyData(data2[0]);
      const data3 = await fetchProperties();
      setProperties(data3 || []);
    }

    fetchData();
  }, []);

  return { propertyOverview, properties, propertyData };
}
