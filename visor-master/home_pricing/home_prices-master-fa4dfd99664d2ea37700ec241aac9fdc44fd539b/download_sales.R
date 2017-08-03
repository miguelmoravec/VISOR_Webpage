library(tidyverse)
library(stringr)
library(magrittr)
library(readxl)
library(rvest)

get_xls_links <- function(url = 'http://www.padctn.org/services/recent-sales/') {
  page <- read_html(url)
  links <- html_nodes(page, 'a')
  xls_links <- links %>% keep(~html_text(.x) == 'XLS')
  xls_urls <- xls_links %>% html_attr('href')
  invisible(xls_urls)
}

download_xls_sales_data <- function(url_list, start_year = 2013, stop_year = 2017) {
  for (year in seq(from = start_year, to = stop_year)) {
    for (month in 1:12) {
      for (zone in c('rural', 'comm', str_c('z_', 1:9))) {
        fn <- sprintf('%02d_%s.xls', month, zone)
        src <- str_c('http://www.padctn.org/sales/', year, '/', fn)
        dest_dir <- file.path('data', year)
        dest <- file.path(dest_dir, fn)
        if (src %in% url_list) {
          if (! dir.exists(dest_dir)) {
            dir.create(dest_dir)
          }
          res <- download.file(src, dest, method="libcurl", mode="wb", quiet = TRUE)
          message("Download ", src, " --> ", dest, ": result = ", res)
        } else {
          message(src, " not in url list.")
        }
      }
    }
  }
}
