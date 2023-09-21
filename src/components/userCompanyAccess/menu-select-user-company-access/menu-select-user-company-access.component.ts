import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserCompanyAccessService } from 'src/services/userCompanyAccess/user-company-access.service';
import { LocalStorageService } from 'src/share/services/local-storage/local-storage.service';

@Component(
	{
		selector: 'menu-select-user-company-access',
		templateUrl: './menu-select-user-company-access.component.html',
		styleUrls: ['./menu-select-user-company-access.component.css']
	}
)

export class MenuSelectUserCompanyAccessComponent implements OnInit
{

	@Output() setUserCompanyAccess = new EventEmitter<any>();
	@Input() selectedUserCompanyAccess:any ={};

	userCompanyAccessList: any[]= [];
	isLoading: boolean  = false;
	
		
	constructor
	(
		private userCompanyAccessService: UserCompanyAccessService,
		private localStorageService: LocalStorageService
	)
		{}
			
	ngOnInit
	(): void 
		{
			this.getAllUserCompanyAccessList();
		}

		async getAllUserCompanyAccessList
		(): Promise<void>
			{
				{

					try
					{
						this.isLoading = true;

						const data = await this.userCompanyAccessService.getAll();

						console.log(data.userCompanyAccessList);
						this.userCompanyAccessList = data.userCompanyAccessList;
						const workingUserCompanyAccess =  this.localStorageService.getUserCompanyAccess();

						this.selectedUserCompanyAccess =this.userCompanyAccessList.find(
							(
								currentUserCompanyAccess:any
							) =>
								{
									if
									(
										currentUserCompanyAccess._id == workingUserCompanyAccess._id
									)
										{
											return currentUserCompanyAccess;
										}
								}
						) 

						this.isLoading = false;
					}
				catch
				(
					error:any
				)
					{
						this.isLoading = false;
						if
						(
							error.error &&
							error.error.message
						)
							{
								alert(error.error.message);
							}
						else
							{
								alert(error)
							}
					}

			}
		
		}


	

	selectUserCompanyAccess
	(
		userCompanyAccess:any
	):void
		{
			this.selectedUserCompanyAccess = userCompanyAccess;
			this.localStorageService.setUserCompanyAccess(this.selectedUserCompanyAccess);
			this.setUserCompanyAccess.emit(this.selectedUserCompanyAccess);
			location.reload()
		}
}
