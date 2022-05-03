# install.packages("RSocrata")
# https://github.com/Chicago/RSocrata

setwd("~/Documents/GitHub/interactivedataviz/data/NYC zipcode geodata")
library(RSocrata)

token <- "...  Get from https://data.ny.gov/profile/edit/developer_settings"
Farmers_Markets <- read.socrata("https://data.ny.gov/resource/qq4h-8p86.json", 
                                app_token = token, stringsAsFactors = TRUE)
nrow(Farmers_Markets)
summary(Farmers_Markets)

Farmers_Markets <- Farmers_Markets[!is.na(Farmers_Markets$latitude),]

save.image('Farmers_Markets.rdata')
write.csv(Farmers_Markets, "2020_Farmers_Markets.csv", row.names = FALSE)
