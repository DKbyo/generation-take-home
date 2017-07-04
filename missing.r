library(jsonlite)
stores <- fromJSON("store_directory_with_location.json", flatten=TRUE)
missinglocations <- stores[is.na(stores$Lat),]
