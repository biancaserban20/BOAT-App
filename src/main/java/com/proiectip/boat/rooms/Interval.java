package com.proiectip.boat.rooms;

import java.util.Date;
import java.util.List;

public class Interval {
    private Date startDate;
    private Date endDate;

    public Interval(Date startDate, Date endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public boolean checkInterval(){
        if(startDate.compareTo(endDate) > 0) {
            return false;
        }
        return true;
    }
    static public int checkDisponibility(List<Interval> intervals, Interval myInterval) {
        if(intervals.size() == 0) {
            return 0;
        }
        Date startDate = myInterval.getStartDate();
        Date endDate = myInterval.getEndDate();
        for (int i = 0; i < intervals.size(); i++) {
            Interval interval = intervals.get(i);
            Date d1 = interval.getStartDate();
            Date d2 = interval.getEndDate();

            if(endDate.compareTo(d1) <=0) {
                return i;
            }

            if(startDate.compareTo(d2) >= 0) {
                if(i == intervals.size() - 1) {
                    return i+1;
                }
                if(endDate.compareTo(intervals.get(i+1).getStartDate()) <= 0) {
                    return i+1;
                }
            }

        }
        return -1;
    }
}
