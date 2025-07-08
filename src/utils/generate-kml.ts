export function generateKML(groupName: string, coordinates: any[]) {
  const placemarks = coordinates
    .map((coord, idx) => {
      return `
      <Placemark>
        <name>Koordinat ${idx + 1}</name>
        <description><![CDATA[
          <p><b>Alamat:</b> ${coord.address || "-"}</p>
          <p><b>Image:</b> ${
            coord.imagePath
              ? `<a href='https://odp.tridatafiber.com/public/${groupName}/${coord.imagePath}' target='_blank'>View</a>`
              : "-"
          }</p>
        ]]></description>
        <Point>
          <coordinates>${coord.long},${coord.lat},0</coordinates>
        </Point>
      </Placemark>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
      <Folder>
        <name>${groupName}</name>
        ${placemarks}
      </Folder>
    </Document>
  </kml>`;
}

export function generateAllGroupsKML(
  groups: { name: string; coordinates: any[] }[]
) {
  const folders = groups
    .map((group) => {
      const placemarks = group.coordinates
        .map((coord, idx) => {
          return `
          <Placemark>
            <name>${group.name} - Koordinat ${idx + 1}</name>
            <description><![CDATA[
              <p><b>Alamat:</b> ${coord.address || "-"}</p>
              <p><b>Image:</b> ${
                coord.imagePath
                  ? `<a href='https://odp.tridatafiber.com/public/${group.name}/${coord.imagePath}' target='_blank'>View</a>`
                  : "-"
              }</p>
            ]]></description>
            <Point>
              <coordinates>${coord.long},${coord.lat},0</coordinates>
            </Point>
          </Placemark>`;
        })
        .join("");

      return `
      <Folder>
        <name>${group.name}</name>
        ${placemarks}
      </Folder>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
      ${folders}
    </Document>
  </kml>`;
}
