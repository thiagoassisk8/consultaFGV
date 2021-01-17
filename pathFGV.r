library(writexl)

switch (Sys.info()["sysname"],
          Linux = setwd("~/FGV_Dados")
        #Darwin = setwd("~/Documents/GitHub/COVID-19"),
        #Windows = setwd("~/GitHub/COVID-19")
)
#teste


system('node puppeteer/IGP-DI_IGP-M.js')
system('node puppeteer/IGP-M_2Decendio.js')
system('node puppeteer/1Decendio_IGP-10.js')


nomes <- c("IGP-DI && IGP-M",
           "IGP-M Fechamento Pessoal && 2º Decêndio",
           "1º Decêndio && IGP-10")


for (i in 0:3) {
  
  caminho <- "/home/thiago/Downloads/"
  
  if (i == 0) {
    
    arquivo <- "xgdvConsulta.csv"
    
  } else {
    
    arquivo <- paste0("xgdvConsulta (", i, ").csv")    
    
  }
  
  #print(paste0(caminho,'/', arquivo))
  
  nome <- nomes[i + 1]
  
  file.rename(from = paste0(caminho, "/", arquivo),
              to = paste0(getwd(),'/arquivos/', nome, ".csv"))
  
}

#file.rename(from = paste0(caminho, "/", arquivo),
#            to = paste0('C:/Users/thiago.assis/Documents/arquivos flightradar/', nome, ".csv"))

#}

todos_arquivos <- list.files(path = paste0("arquivos"), pattern = ".csv")
nomes_planilhas <- ""

for (i in todos_arquivos){

  #strsplit(x = i, split = " ")[[1]][1]
  nomes_planilhas <- c(nomes_planilhas, strsplit(x = i, split = " ")[[1]][1])
}
nomes_planilhas <- nomes_planilhas[-1]

planilhas <- list()

for(i in c(1:length(todos_arquivos))) {
  planilhas[[i]] <- read.csv(paste0(getwd(),"/arquivos/", todos_arquivos[i]))
  names(planilhas)[i] <- nomes_planilhas[i]
  
}

write_xlsx(x=planilhas,path="IGP geral.xlsx")



