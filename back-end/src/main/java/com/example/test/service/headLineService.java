package com.example.test.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.LocalDate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.example.test.config.SystemConfig;

@Service
@Component
public class headLineService {

	SystemConfig systemConfig = new SystemConfig();
	File file = new File(systemConfig.getStoragePath()+"/headLine_list.txt");
	List<String> titleList = new ArrayList<>();
	public List<String> getHeadLineTitle() throws IOException{
		if(file.exists()){
			//get titles from local file
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line;
			LocalDate current_date = LocalDate.now();
			String current_date_str = current_date.toString().replaceAll("-","");
			String final_update_date = br.readLine();
			System.out.println("file exist in");
			if(Integer.parseInt(current_date_str)>Integer.parseInt(final_update_date)){
				System.out.println("date compare in");
				FetchTitle fetchTitle =  new FetchTitle();
				titleList = fetchTitle.fetchTitle();
			}else{
				System.out.println("up to date");
				while((line = br.readLine()) != null){
					System.out.println(line);
					//compare current date with final_update_date(first line)
					titleList.add(line);
				}
			}
		}else{
			//fetch titles by chrome driver
			System.out.println("file not exist");
			FetchTitle fetchTitle =  new FetchTitle();
			titleList = fetchTitle.fetchTitle();
		}
		return titleList;
	}

	

}
