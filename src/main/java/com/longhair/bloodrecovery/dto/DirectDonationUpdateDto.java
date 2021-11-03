package com.longhair.bloodrecovery.dto;

import com.longhair.bloodrecovery.domain.DirectDonation;
import lombok.Data;

import java.util.Date;

@Data
public class DirectDonationUpdateDto {
    private Long id;
    private String requesterUserId;
    private String title;
    private String contents;
    private String image;
    private Date date;
    private Date periodFrom;
    private Date periodTo;
    private Boolean completeStatus;

    public DirectDonationUpdateDto(Long id, String requesterUserId, String title, String contents, String image, Date date, Date periodFrom, Date periodTo, Boolean completeStatus) {
        this.id = id;
        this.requesterUserId = requesterUserId;
        this.title = title;
        this.contents = contents;
        this.image = image;
        this.date = date;
        this.periodFrom = periodFrom;
        this.periodTo = periodTo;
        this.completeStatus = completeStatus;
    }

    public DirectDonationUpdateDto(DirectDonation directDonation){
        id = directDonation.getId();
        requesterUserId = directDonation.getRequesterUserId();
        title = directDonation.getTitle();
        contents = directDonation.getContents();
        image = directDonation.getImage();
        date = directDonation.getDate();
        periodFrom = directDonation.getPeriodFrom();
        periodTo = directDonation.getPeriodTo();
        completeStatus = directDonation.getCompleteStatus();
    }
}
